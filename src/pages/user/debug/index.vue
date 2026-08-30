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
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
  Button,
  Chip,
  Column,
  DataTable,
  Message,
  Panel,
  ProgressBar,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Toolbar,
} from 'primevue'
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

// PrimeVue Tag severity based on the status
function statusSeverity(status: DebugResultRow['status']) {
  switch (status) {
    case 'success':
      return 'success'
    case 'error':
      return 'danger'
    case 'running':
      return 'warn'
    default:
      return 'secondary'
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
      <h1 class="flex items-center gap-2 text-4xl font-semibold tracking-tighter text-gray-950">
        <Bug :size="28" />
        {{ t('debug.title') }}
      </h1>
      <p class="text-sm text-gray-600">{{ t('debug.subtitle') }}</p>
    </header>

    <!-- Panel 1: quick reloads + results history -->
    <Panel :header="t('debug.quick-reload')">
      <div class="flex flex-col gap-3">
        <!-- Button bar: reload all + one button per catalog unit -->
        <div class="flex flex-wrap items-center gap-2">
          <Button severity="contrast" :loading="reloadingAll" @click="runAll">
            <RotateCw :size="16" class="mr-2" />
            {{ t('debug.reload-all') }}
          </Button>

          <template v-for="item in quickReloads" :key="item.entry.storeId + '::' + item.unit.label">
            <Button
              severity="secondary"
              size="small"
              outlined
              :disabled="reloadingAll"
              @click="runUnit(item.entry, item.unit)"
            >
              <RefreshCw :size="14" class="mr-1" />
              {{ t(item.unit.label) }}
            </Button>
          </template>

          <Button
            v-if="results.length"
            severity="danger"
            size="small"
            text
            :disabled="reloadingAll"
            @click="clearResults"
          >
            {{ t('debug.clear-results') }}
          </Button>
        </div>

        <!-- "Reload all" progress bar -->
        <div v-if="quickReloads.length" class="flex flex-col gap-1">
          <ProgressBar :value="progress" />
          <div class="flex items-center justify-between text-xs text-gray-500">
            <span>{{ doneCount }} / {{ quickReloads.length }}</span>
            <span>{{ progress }}%</span>
          </div>
        </div>

        <!-- Reload history (status + possible error message) -->
        <DataTable
          v-if="results.length"
          :value="results"
          size="small"
          striped-rows
          scrollable
          scroll-height="18rem"
        >
          <Column field="storeLabel" :header="t('debug.column.store')" class="w-40">
            <template #body="{ data }">
              <span class="text-xs">{{ data.storeLabel }}</span>
            </template>
          </Column>
          <Column field="unitLabel" :header="t('debug.column.unit')">
            <template #body="{ data }">
              <code class="text-xs">{{ t(data.unitLabel) }}</code>
            </template>
          </Column>
          <Column field="status" :header="t('debug.column.status')" class="w-32">
            <template #body="{ data }">
              <Tag :severity="statusSeverity(data.status)" rounded>
                {{ statusLabel(data.status) }}
              </Tag>
            </template>
          </Column>
          <Column :header="'Message'">
            <template #body="{ data }">
              <span v-if="data.message" class="text-xs break-all text-red-600">{{
                data.message
              }}</span>
            </template>
          </Column>
        </DataTable>
      </div>
    </Panel>

    <!-- Panel 2: route permissions + forced reload of the perm store -->
    <Panel>
      <template #header>
        <div class="flex items-center gap-2">
          <ShieldCheck :size="20" />
          {{ t('debug.permissions') }}
        </div>
      </template>

      <div class="flex flex-col gap-3">
        <p class="text-xs text-gray-500">{{ t('debug.permissions.subtitle') }}</p>

        <!-- Summary (session, route count) + forced re-fetch button -->
        <Toolbar>
          <template #start>
            <div class="flex flex-wrap items-center gap-2">
              <Tag :severity="permStore.hasSession ? 'success' : 'danger'" rounded>
                {{ permStore.hasSession ? 'Session OK' : 'No session' }}
              </Tag>
              <Tag severity="contrast" rounded>{{ permStore.routes.length }} routes</Tag>
            </div>
          </template>
          <template #end>
            <Button
              severity="contrast"
              size="small"
              :loading="permStore.loading || reloadingAll"
              @click="permStore.hydrate(true)"
            >
              <RotateCw :size="14" class="mr-1" />
              {{ t('debug.permissions.reload') }}
            </Button>
          </template>
        </Toolbar>

        <!-- Error / no session => message; otherwise the routes table -->
        <Message v-if="permStore.errored" severity="error" :sticky="true">
          {{ t('debug.status.error') }}
        </Message>
        <Message v-else-if="!permStore.hasSession" severity="info" :sticky="true">
          {{ t('debug.routes.empty') }}
        </Message>
        <DataTable
          v-else
          :value="permStore.routes"
          size="small"
          striped-rows
          scrollable
          scroll-height="22rem"
        >
          <Column field="routes" :header="'Route'" class="w-64">
            <template #body="{ data }">
              <code class="text-xs">{{ data.routes }}</code>
            </template>
          </Column>
          <Column field="path" :header="'Path'" class="w-56">
            <template #body="{ data }">
              <code class="text-xs text-gray-600">{{ data.path }}</code>
            </template>
          </Column>
          <Column field="name" :header="'Name'" class="w-56">
            <template #body="{ data }">
              <span class="text-xs">{{ data.name || data.descDefault }}</span>
            </template>
          </Column>
          <Column field="method" :header="t('debug.permissions.method')" class="w-24">
            <template #body="{ data }">
              <code class="text-xs">{{ data.method }}</code>
            </template>
          </Column>
          <Column field="level" :header="t('debug.permissions.level')" class="w-32">
            <template #body="{ data }">
              <Tag v-if="data.level" severity="warn" rounded>{{ data.level }}</Tag>
              <span v-else class="text-xs text-gray-400">—</span>
            </template>
          </Column>
          <!-- "Authorized" column: cross-checked with the store authorizedRoutes -->
          <Column :header="t('debug.permissions.authorized')" class="w-40">
            <template #body="{ data }">
              <Tag
                v-if="permStore.authorizedRoutes.some((a) => a.id === data.id)"
                severity="success"
                rounded
              >
                {{
                  permStore.authorizedRoutes.find((a) => a.id === data.id)?.routePermLevels ?? '✓'
                }}
              </Tag>
              <Tag v-else severity="secondary" rounded> ✗ </Tag>
            </template>
          </Column>
        </DataTable>
      </div>
    </Panel>

    <!-- Panel 3: full inspection of every store -->
    <Panel>
      <template #header>
        <div class="flex items-center gap-2">
          <Database :size="20" />
          {{ t('debug.stores') }}
        </div>
      </template>

      <p class="mb-3 text-xs text-gray-500">{{ t('debug.stores.subtitle') }}</p>

      <!-- One accordion per store: state, getters and actions in tabs -->
      <Accordion multiple :value="openPanels">
        <AccordionPanel v-for="card in stores" :key="card.store.$id" :value="card.store.$id">
          <AccordionHeader as="div">
            <!-- Header: name, id, "extra" badge and the reload button -->
            <div class="flex w-full items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="font-medium">{{
                  card.entry ? t(card.entry.label) : card.store.$id
                }}</span>
                <Chip :label="card.store.$id" size="small" class="px-2" />
                <Tag v-if="!card.fromCatalog" severity="warn" rounded>
                  {{ t('debug.extra-stores') }}
                </Tag>
              </div>
              <Button
                v-if="card.entry?.reloads.length"
                severity="secondary"
                size="small"
                outlined
                :disabled="reloadingAll"
                @click.stop="runStore(card.entry!)"
              >
                <RefreshCw :size="14" class="mr-1" />
                {{ t('debug.action.reload') }}
              </Button>
            </div>
          </AccordionHeader>

          <AccordionContent>
            <div class="flex flex-col gap-3 py-2">
              <Tabs :value="card.store.$id + '-state'">
                <TabList>
                  <!-- Tabs: variable count displayed for each category -->
                  <Tab :value="card.store.$id + '-state'">
                    {{ t('debug.tab.state') }} ({{ card.inspection.state.length }})
                  </Tab>
                  <Tab :value="card.store.$id + '-getters'">
                    {{ t('debug.tab.getters') }} ({{ card.inspection.getters.length }})
                  </Tab>
                  <Tab :value="card.store.$id + '-actions'">
                    {{ t('debug.tab.actions') }} ({{ card.inspection.actions.length }})
                  </Tab>
                </TabList>
                <TabPanels>
                  <!-- State and getters => key/value display (secrets masked) -->
                  <TabPanel :value="card.store.$id + '-state'">
                    <VariableTable :rows="card.inspection.state" />
                  </TabPanel>
                  <TabPanel :value="card.store.$id + '-getters'">
                    <VariableTable :rows="card.inspection.getters" />
                  </TabPanel>
                  <!-- Actions => list + run button (for reload actions) -->
                  <TabPanel :value="card.store.$id + '-actions'">
                    <DataTable :value="card.inspection.actions" size="small" striped-rows>
                      <Column field="key" :header="t('debug.column.key')" class="w-56">
                        <template #body="{ data }">
                          <code class="text-xs font-medium">{{ data.key }}</code>
                        </template>
                      </Column>
                      <Column :header="t('debug.column.signature')">
                        <template #body="{ data }">
                          <code class="text-xs text-gray-600">{{ data.signature }}</code>
                        </template>
                      </Column>
                      <Column :header="t('debug.action.run')" class="w-32">
                        <template #body="{ data }">
                          <Button
                            size="small"
                            :disabled="!isRunnable(card.store, data.key)"
                            :loading="runningActionKey === card.store.$id + '::' + data.key"
                            @click="runAction(card.store, data.key)"
                          >
                            <Play :size="14" class="mr-1" />
                            {{ t('debug.action.run') }}
                          </Button>
                        </template>
                      </Column>
                    </DataTable>
                    <p v-if="!card.inspection.actions.length" class="text-xs text-gray-400">
                      {{ t('debug.empty') }}
                    </p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </Panel>
  </div>
</template>
