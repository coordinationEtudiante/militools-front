<script setup lang="ts">
/* ------------------------------------------------------------------
  Debug page: lets you reload the stores one by one, inspect all of their
  variables (state/getters/actions) and visualize route permissions.
  Everything is driven by the STORE_DEBUG_CATALOG: no store or action name
  is hard-coded here.
------------------------------------------------------------------- */
import VariableTable from '@/components/debug/VariableTable.vue'
import {
  STORE_DEBUG_CATALOG,
  type DebugReloadUnit,
  type DebugStoreEntry,
} from '@/stores/debug.catalog'
import { usePermStore } from '@/stores/perm.store'
import {
  getAllRegisteredStores,
  inspectStore,
  isLikelyReloadAction,
  type DebugStore,
  type StoreInspection,
} from '@/tools/debug.utils'
import { Bug, Database, Play, RefreshCw, RotateCw, ShieldCheck } from '@lucide/vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const permStore = usePermStore()

// A row of the reload results table
type DebugResultRow = {
  key: string
  storeId: string
  storeLabel: string
  unitLabel: string
  status: 'pending' | 'running' | 'success' | 'error'
  message?: string
}

// (store, unit) pair extracted from the catalog, ready to run
type QuickReload = { entry: DebugStoreEntry; unit: DebugReloadUnit }

// Max duration of a reload (the "running" status stays bounded in time)
const RELOAD_TIMEOUT_MS = 20_000

const results = ref<DebugResultRow[]>([])
const reloadingAll = ref(false)
const runningActionKey = ref<string | null>(null)

// Flattens the catalog into a list of "quick reload" buttons
const quickReloads = computed<QuickReload[]>(() =>
  STORE_DEBUG_CATALOG.flatMap((entry) => entry.reloads.map((unit) => ({ entry, unit }))),
)

// Stable key for one result row (store + unit + action)
function resultKey(storeId: string, unitLabel: string, keyName: string) {
  return `${storeId}::${unitLabel}::${keyName}`
}

/**
 * Runs an action with a hard timeout. Important: without this guard, a
 * request that never settles would leave the status stuck on "running"
 * forever.
 */
function runWithTimeout(action: () => Promise<unknown>, ms: number): Promise<unknown> {
  return new Promise((resolve, reject) => {
    // Arms the timer; on expiry it rejects with a clear message.
    const timer = globalThis.setTimeout(() => {
      reject(new Error(`Timeout (${Math.round(ms / 1000)}s)`))
    }, ms)
    // The promise resolves as soon as the action finishes (success or error).
    action().then(
      (value) => {
        globalThis.clearTimeout(timer)
        resolve(value)
      },
      (err) => {
        globalThis.clearTimeout(timer)
        reject(err)
      },
    )
  })
}

// Counters for the "Reload all" progress bar
const doneCount = computed(
  () => results.value.filter((r) => r.status === 'success' || r.status === 'error').length,
)
const progress = computed(() =>
  quickReloads.value.length ? Math.round((doneCount.value / quickReloads.value.length) * 100) : 0,
)

/**
 * Runs one reload unit and updates its result row.
 * Updates are immutable (a new array) so the DataTable always re-renders
 * on every status change.
 */
async function runUnit(entry: DebugStoreEntry, unit: DebugReloadUnit) {
  const key = resultKey(entry.storeId, unit.label, unit.key)
  // Existing row? Otherwise build the skeleton (default status).
  const base = results.value.find((r) => r.key === key) ?? {
    key,
    storeId: entry.storeId,
    storeLabel: entry.label,
    unitLabel: unit.label,
  }

  // Updates the row WITHOUT mutating it in place (new array each time)
  function patch(status: DebugResultRow['status'], message?: string) {
    const updated = results.value.map((row) =>
      row.key === key ? { ...row, status, message } : row,
    )
    if (!updated.some((row) => row.key === key)) {
      updated.push({ ...base, status, message })
    }
    results.value = updated
  }

  patch('running')

  try {
    // Resolves the store through the catalog, then fetches the action by name.
    const store = entry.getStore()
    const action = store[unit.key]
    if (typeof action !== 'function') {
      throw new Error(`Action "${unit.key}" not found on store "${entry.storeId}"`)
    }
    await runWithTimeout(
      () => (action as (...args: unknown[]) => Promise<unknown>)(...(unit.args ?? [])),
      RELOAD_TIMEOUT_MS,
    )
    patch('success')
  } catch (err) {
    // Errors (network, timeout, backend...) are shown in the row.
    patch('error', err instanceof Error ? err.message : String(err))
  }
}

// Reloads every unit of a store, sequentially
async function runStore(entry: DebugStoreEntry) {
  for (const unit of entry.reloads) {
    await runUnit(entry, unit)
  }
}

// "Reload all": empties the results, then runs every unit in sequence
async function runAll() {
  if (reloadingAll.value) {
    return
  }
  results.value = []
  reloadingAll.value = true
  try {
    for (const { entry, unit } of quickReloads.value) {
      await runUnit(entry, unit)
    }
  } finally {
    reloadingAll.value = false
  }
}

function clearResults() {
  results.value = []
}

// UBadge color based on the status
function statusColor(status: DebugResultRow['status']) {
  switch (status) {
    case 'success':
      return 'success'
    case 'error':
      return 'error'
    case 'running':
      return 'warning'
    default:
      return 'neutral'
  }
}

function statusLabel(status: DebugResultRow['status']) {
  return t(`debug.status.${status}`)
}

// Store card: catalog entry (or null when uncatalogued) + real store +
// inspection. fromCatalog marks stores discovered automatically.
type StoreCard = {
  entry: DebugStoreEntry | null
  store: DebugStore
  inspection: StoreInspection
  fromCatalog: boolean
}

/**
 * Builds the displayed store list = catalog entries + every other store
 * registered in Pinia but absent from the catalog.
 */
function buildStores(): StoreCard[] {
  const catalog = STORE_DEBUG_CATALOG.map((entry) => {
    const store = entry.getStore()
    return { entry, store, inspection: inspectStore(store), fromCatalog: true }
  })

  const catalogIds = new Set(STORE_DEBUG_CATALOG.map((entry) => entry.storeId))
  const extras = getAllRegisteredStores()
    .filter((store) => !catalogIds.has(store.$id))
    .map((store) => ({
      entry: null,
      store,
      inspection: inspectStore(store),
      fromCatalog: false,
    }))

  return [...catalog, ...extras]
}

const stores = computed(() => buildStores())

// Items for the UAccordion: one entry per store card.
const accordionItems = computed(() =>
  stores.value.map((card) => ({
    label: card.entry ? t(card.entry.label) : card.store.$id,
    value: card.store.$id,
    storeId: card.store.$id,
    fromCatalog: card.fromCatalog,
    entry: card.entry,
    store: card.store,
    inspection: card.inspection,
  })),
)

// Tabs for one store card (state / getters / actions).
const actionColumns = [
  { accessorKey: 'key', header: t('debug.column.key') },
  { accessorKey: 'signature', header: t('debug.column.signature') },
  { id: 'run', header: t('debug.action.run') },
]

const resultColumns = [
  { accessorKey: 'storeLabel', header: t('debug.column.store') },
  { accessorKey: 'unitLabel', header: t('debug.column.unit') },
  { accessorKey: 'status', header: t('debug.column.status') },
  { id: 'message', header: 'Message' },
]

const routeColumns = [
  { accessorKey: 'routes', header: 'Route' },
  { accessorKey: 'path', header: 'Path' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'method', header: t('debug.permissions.method') },
  { accessorKey: 'level', header: t('debug.permissions.level') },
  { id: 'authorized', header: t('debug.permissions.authorized') },
]

function storeTabs(card: (typeof stores.value)[number]) {
  return [
    {
      label: `${t('debug.tab.state')} (${card.inspection.state.length})`,
      value: card.store.$id + '-state',
      rows: card.inspection.state,
      kind: 'table' as const,
    },
    {
      label: `${t('debug.tab.getters')} (${card.inspection.getters.length})`,
      value: card.store.$id + '-getters',
      rows: card.inspection.getters,
      kind: 'table' as const,
    },
    {
      label: `${t('debug.tab.actions')} (${card.inspection.actions.length})`,
      value: card.store.$id + '-actions',
      actions: card.inspection.actions,
      kind: 'actions' as const,
    },
  ]
}

// All stores open by default
const openPanels = computed(() => stores.value.map((card) => card.store.$id))

// An action is runnable if its name suggests a reload (hydrate/reload/
// fetch...) or if it is declared in the catalog.
function isRunnable(store: DebugStore, actionKey: string): boolean {
  if (isLikelyReloadAction(actionKey)) {
    return true
  }
  const entry = STORE_DEBUG_CATALOG.find((e) => e.storeId === store.$id)
  return Boolean(entry?.reloads.some((unit) => unit.key === actionKey))
}

// Runs an action of the store without going through runUnit (used by the
// Actions tabs). The button "loading" state is driven by the action name.
async function runAction(store: DebugStore, actionKey: string) {
  const action = store[actionKey]
  if (typeof action !== 'function') {
    return
  }
  runningActionKey.value = `${store.$id}::${actionKey}`
  try {
    await (action as (...args: unknown[]) => unknown)()
  } finally {
    runningActionKey.value = null
  }
}
</script>

<template>
  <div class="flex w-full min-w-0 flex-col gap-4 overflow-x-hidden p-2">
    <!-- Page title -->
    <header class="flex flex-col gap-1">
      <h1 class="flex items-center gap-2 text-4xl font-semibold tracking-tighter text-highlighted">
        <Bug :size="28" />
        {{ t('debug.title') }}
      </h1>
      <p class="text-sm text-muted">{{ t('debug.subtitle') }}</p>
    </header>

    <!-- Panel 1: quick reloads + results history -->
    <UCard>
      <template #header>{{ t('debug.quick-reload') }}</template>
      <div class="flex flex-col gap-3">
        <!-- Button bar: reload all + one button per catalog unit -->
        <div class="flex flex-wrap items-center gap-2">
          <UButton color="neutral" variant="solid" :loading="reloadingAll" @click="runAll">
            <RotateCw :size="16" class="mr-2" />
            {{ t('debug.reload-all') }}
          </UButton>

          <template v-for="item in quickReloads" :key="item.entry.storeId + '::' + item.unit.label">
            <UButton
              color="neutral"
              variant="outline"
              size="xs"
              :disabled="reloadingAll"
              @click="runUnit(item.entry, item.unit)"
            >
              <RefreshCw :size="14" class="mr-1" />
              {{ t(item.unit.label) }}
            </UButton>
          </template>

          <UButton
            v-if="results.length"
            color="error"
            variant="ghost"
            size="xs"
            :disabled="reloadingAll"
            @click="clearResults"
          >
            {{ t('debug.clear-results') }}
          </UButton>
        </div>

        <!-- "Reload all" progress bar -->
        <div v-if="quickReloads.length" class="flex flex-col gap-1">
          <UProgress :value="progress" />
          <div class="flex items-center justify-between text-xs text-muted">
            <span>{{ doneCount }} / {{ quickReloads.length }}</span>
            <span>{{ progress }}%</span>
          </div>
        </div>

        <!-- Reload history (status + possible error message) -->
        <UTable
          v-if="results.length"
          :data="results"
          :columns="resultColumns"
          class="max-h-72 overflow-auto"
        >
          <template #storeLabel-cell="{ row }">
            <span class="text-xs">{{ row.original.storeLabel }}</span>
          </template>
          <template #unitLabel-cell="{ row }">
            <code class="text-xs">{{ t(row.original.unitLabel) }}</code>
          </template>
          <template #status-cell="{ row }">
            <UBadge :color="statusColor(row.original.status)" variant="soft" size="xs" rounded>
              {{ statusLabel(row.original.status) }}
            </UBadge>
          </template>
          <template #message-cell="{ row }">
            <span v-if="row.original.message" class="text-xs break-all text-error">{{
              row.original.message
            }}</span>
          </template>
        </UTable>
      </div>
    </UCard>

    <!-- Panel 2: route permissions + forced reload of the perm store -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <ShieldCheck :size="20" />
          {{ t('debug.permissions') }}
        </div>
      </template>

      <div class="flex flex-col gap-3">
        <p class="text-xs text-muted">{{ t('debug.permissions.subtitle') }}</p>

        <!-- Summary (session, route count) + forced re-fetch button -->
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex flex-wrap items-center gap-2">
            <UBadge :color="permStore.hasSession ? 'success' : 'error'" variant="soft" size="xs" rounded>
              {{ permStore.hasSession ? 'Session OK' : 'No session' }}
            </UBadge>
            <UBadge color="neutral" variant="soft" size="xs" rounded>{{ permStore.routes.length }} routes</UBadge>
          </div>
          <UButton
            color="neutral"
            variant="solid"
            size="xs"
            :loading="permStore.loading || reloadingAll"
            @click="permStore.hydrate(true)"
          >
            <RotateCw :size="14" class="mr-1" />
            {{ t('debug.permissions.reload') }}
          </UButton>
        </div>

        <!-- Error / no session => message; otherwise the routes table -->
        <UAlert v-if="permStore.errored" color="error">
          {{ t('debug.status.error') }}
        </UAlert>
        <UAlert v-else-if="!permStore.hasSession" color="info">
          {{ t('debug.routes.empty') }}
        </UAlert>
        <UTable
          v-else
          :data="permStore.routes"
          :columns="routeColumns"
          class="max-h-88 overflow-auto"
        >
          <template #routes-cell="{ row }">
            <code class="text-xs">{{ row.original.routes }}</code>
          </template>
          <template #path-cell="{ row }">
            <code class="text-xs text-muted">{{ row.original.path }}</code>
          </template>
          <template #name-cell="{ row }">
            <span class="text-xs">{{ row.original.name || row.original.descDefault }}</span>
          </template>
          <template #method-cell="{ row }">
            <code class="text-xs">{{ row.original.method }}</code>
          </template>
          <template #level-cell="{ row }">
            <UBadge v-if="row.original.level" color="warning" variant="soft" size="xs" rounded>{{ row.original.level }}</UBadge>
            <span v-else class="text-xs text-muted">—</span>
          </template>
          <template #authorized-cell="{ row }">
            <UBadge
              v-if="permStore.authorizedRoutes.some((a) => a.id === row.original.id)"
              color="success"
              variant="soft"
              size="xs"
              rounded
            >
              {{
                permStore.authorizedRoutes.find((a) => a.id === row.original.id)?.routePermLevels ?? '✓'
              }}
            </UBadge>
            <UBadge v-else color="neutral" variant="soft" size="xs" rounded> ✗ </UBadge>
          </template>
        </UTable>
      </div>
    </UCard>

    <!-- Panel 3: full inspection of every store -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <Database :size="20" />
          {{ t('debug.stores') }}
        </div>
      </template>

      <p class="mb-3 text-xs text-muted">{{ t('debug.stores.subtitle') }}</p>

      <!-- One accordion per store: state, getters and actions in tabs -->
      <UAccordion multiple :default-value="openPanels" :items="accordionItems">
        <template #default="{ item }">
          <div class="flex w-full items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="font-medium">{{ item.label }}</span>
              <UBadge color="neutral" variant="soft" size="xs" class="px-2">{{ item.storeId }}</UBadge>
              <UBadge v-if="!item.fromCatalog" color="warning" variant="soft" size="xs" rounded>
                {{ t('debug.extra-stores') }}
              </UBadge>
            </div>
            <UButton
              v-if="item.entry?.reloads.length"
              color="neutral"
              variant="outline"
              size="xs"
              :disabled="reloadingAll"
              @click.stop="runStore(item.entry!)"
            >
              <RefreshCw :size="14" class="mr-1" />
              {{ t('debug.action.reload') }}
            </UButton>
          </div>
        </template>
        <template #content="{ item }">
          <div class="flex flex-col gap-3 py-2">
            <UTabs :default-value="item.storeId + '-state'" :items="storeTabs(item)">
              <template #content="{ item: tab }">
                <VariableTable v-if="tab.kind === 'table'" :rows="tab.rows" />
                <template v-else>
                  <UTable
                    :data="tab.actions"
                    :columns="actionColumns"
                  >
                    <template #key-cell="{ row }">
                      <code class="text-xs font-medium">{{ row.original.key }}</code>
                    </template>
                    <template #signature-cell="{ row }">
                      <code class="text-xs text-muted">{{ row.original.signature }}</code>
                    </template>
                    <template #run-cell="{ row }">
                      <UButton
                        size="xs"
                        :disabled="!isRunnable(item.store, row.original.key)"
                        :loading="runningActionKey === item.storeId + '::' + row.original.key"
                        @click="runAction(item.store, row.original.key)"
                      >
                        <Play :size="14" class="mr-1" />
                        {{ t('debug.action.run') }}
                      </UButton>
                    </template>
                  </UTable>
                  <p v-if="!tab.actions.length" class="text-xs text-muted">
                    {{ t('debug.empty') }}
                  </p>
                </template>
              </template>
            </UTabs>
          </div>
        </template>
      </UAccordion>
    </UCard>
  </div>
</template>
