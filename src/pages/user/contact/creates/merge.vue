<template>
  <Toast />
  <div v-if="errored" class="flex h-full w-full items-center justify-center">
    <Message severity="error" variant="simple">{{ t('error') }}</Message>
  </div>
  <div v-else class="flex h-full w-full flex-col gap-2">
    <Card class="w-full shrink-0">
      <template #title>{{ t('merge') }}</template>
      <template #content>
        <!-- progress bar -->
        <div class="flex h-2 w-full gap-4">
          <div class="h-2 w-full rounded-full bg-sky-500"></div>
          <div class="h-2 w-full rounded-full bg-sky-500"></div>
          <div class="h-2 w-full rounded-full bg-sky-500"></div>
        </div>
      </template>
    </Card>

    <div class="flex min-h-0 flex-1 flex-col gap-2 xl:flex-row">
      <!-- duplicates list -->
      <Card
        class="flex max-h-72 min-h-0 w-full shrink-0 flex-col xl:max-h-none xl:w-2/5"
        :pt="{
          body: { class: 'flex min-h-0 flex-1 flex-col' },
          content: { class: 'flex min-h-0 flex-1 flex-col overflow-hidden' },
        }"
      >
        <template #header>
          <h1 class="text-xl text-gray-950">
            {{ t('duplications-detected', { nbDuplicate: nbDuplicate ?? '...' }) }}
          </h1>
        </template>
        <template #content>
          <div v-if="loading" class="flex items-center justify-center p-8 text-gray-400">
            {{ t('merge.loading') }}
          </div>
          <div
            v-else-if="duplicates.length === 0"
            class="flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-8 text-gray-500"
          >
            <CircleCheck class="h-5 w-5 text-emerald-500" />
            {{ t('no-duplicate') }}
          </div>
          <div v-else class="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
            <Button
              v-for="(dup, i) in duplicates"
              :key="dup.index"
              class="w-full"
              :class="{ 'ring-2 ring-blue-300': selectedIdx === i }"
              severity="secondary"
              @click="selectDuplicate(i)"
            >
              <div class="flex w-full flex-wrap items-center justify-between gap-2">
                <span class="flex min-w-0 flex-col items-start">
                  <span class="truncate text-sm font-semibold">
                    {{ summaryOf(dup) || `#${dup.index}` }}
                  </span>
                  <span class="text-xs text-gray-500">
                    {{ t('duplication-index', { index: dup.index + 1 }) }}
                  </span>
                </span>
                <Tag
                  :severity="statusSeverity(dup.status)"
                  :value="t(`duplication.${dup.status}`)"
                />
              </div>
            </Button>
          </div>
        </template>
      </Card>

      <!-- merge editor -->
      <Card
        class="flex min-h-0 w-full flex-1 flex-col"
        :pt="{
          body: { class: 'flex min-h-0 flex-1 flex-col' },
          content: { class: 'flex min-h-0 flex-1 flex-col overflow-hidden' },
        }"
      >
        <template #header>
          <h1 class="flex min-w-0 items-center gap-2 text-xl text-gray-950">
            <span class="truncate">{{ selectedTitle || t('merge') }}</span>
            <Tag
              v-if="selectedDuplicate"
              :severity="statusSeverity(selectedDuplicate.status)"
              :value="t(`duplication.${selectedDuplicate.status}`)"
            />
          </h1>
        </template>
        <template #content>
          <div v-if="loading" class="flex items-center justify-center p-8 text-gray-400">
            {{ t('merge.loading') }}
          </div>
          <div
            v-else-if="mergeFields.length === 0"
            class="flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-8 text-gray-500"
          >
            <Users class="h-5 w-5" />
            {{ t('no-duplicate') }}
          </div>
          <div v-else class="min-h-0 flex-1 overflow-auto">
            <!-- desktop header -->
            <div
              class="hidden bg-gray-50 px-3 py-2 text-xs font-semibold tracking-wide text-gray-500 uppercase md:grid md:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_2.5rem_minmax(0,1fr)_2.5rem_minmax(0,1fr)] md:rounded-t-lg"
            >
              <div>{{ t('field') }}</div>
              <div>{{ t('local-version') }}</div>
              <div></div>
              <div>{{ t('final-version') }}</div>
              <div></div>
              <div>{{ t('server-version') }}</div>
            </div>
            <MergeFieldRow
              v-for="field in mergeFields"
              :key="field.name"
              :field="field"
              @apply-local="applyLocal(field)"
              @apply-server="applyServer(field)"
              @update:final="(value) => updateFinal(field, value)"
            />
          </div>
        </template>
        <template #footer>
          <div class="flex w-full flex-wrap items-center justify-center gap-2">
            <Button :label="t('aplicate-local')" severity="secondary" @click="applyAllLocal" />
            <Button :label="t('aplicate-server')" severity="secondary" @click="applyAllServer" />
            <Button
              :label="t('abort')"
              variant="outlined"
              severity="contrast"
              @click="abortMerge"
            />
            <Button :label="t('save-and-next')" @click="saveAndNext" />
          </div>
        </template>
      </Card>
    </div>

    <Card class="w-full shrink-0">
      <template #content>
        <div class="flex w-full items-center justify-between gap-2">
          <Message
            v-if="unresolvedCount > 0"
            severity="warn"
            variant="simple"
            size="small"
            class="min-w-0"
          >
            {{ t('merge-unresolved', { nb: unresolvedCount }) }}
          </Message>
          <span v-else />
          <Button severity="success" @click="goToRecap">{{ t('next') }}</Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import MergeFieldRow from '@/components/contacts/MergeFieldRow.vue'
import { useAreaStore } from '@/stores/area.store'
import { DataStorage } from '@/stores/contact/creates/dataStorage'
import { FieldsToIds, cleanContactData } from '@/tools/area.utils'
import { fetchResource } from '@/tools/fetch.utils'
import { extremTrim, mostProbableValue } from '@/tools/string.utils'
import type { MergeDuplicate, MergeField } from '@/types/merge.type'
import { CircleCheck, Users } from '@lucide/vue'
import { Button, Card, Message, Tag, Toast, useToast } from 'primevue'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const area = useAreaStore()
const { t } = useI18n()
const toast = useToast()
const router = useRouter()

const types = ref<{ name: string; type: string }[]>([])
const typeByName = ref<Map<string, string>>(new Map())
const values = ref<Record<string, string>[]>([])
const duplicates = ref<MergeDuplicate[]>([])
const selectedIdx = ref(0)
const mergeFields = ref<MergeField[]>([])
const nbDuplicate = ref<number>()
const errored = ref(false)
const loading = ref(true)

const selectedDuplicate = computed(() => duplicates.value[selectedIdx.value])
const selectedLocal = computed(() => values.value[selectedDuplicate.value?.index ?? -1] ?? {})
const unresolvedCount = computed(
  () => duplicates.value.filter((d) => d.status === 'to-resolved').length,
)
const primaryFieldNames = computed(() => area.primaryFields.map((f) => f.name))
const selectedTitle = computed(() => summaryOf(selectedDuplicate.value))

function buildMergeFields(dup: MergeDuplicate, local: Record<string, string>): MergeField[] {
  const serverBy = new Map(dup.duplicateOf.map((d) => [d.name, d]))
  const names = Array.from(new Set([...dup.duplicateOf.map((d) => d.name), ...Object.keys(local)]))

  return names.map((name) => {
    const serverField = serverBy.get(name)
    const server = serverField?.value ?? ''
    const localValue = local[name] ?? ''
    const same = localValue !== '' && server !== '' && extremTrim(localValue) === extremTrim(server)

    return {
      name,
      serverId: serverField?.id,
      type: typeByName.value.get(name) ?? '',
      local: localValue,
      server,
      final: same ? mostProbableValue(localValue, server) : localValue !== '' ? localValue : server,
      autoResolved: same,
    }
  })
}

function isAutoResolved(dup: MergeDuplicate): boolean {
  const local = values.value[dup.index] ?? {}
  return buildMergeFields(dup, local).every((f) => !(f.local && f.server) || f.autoResolved)
}

function selectDuplicate(i: number) {
  selectedIdx.value = i
  mergeFields.value = buildMergeFields(selectedDuplicate.value, selectedLocal.value)
}

function summaryOf(dup?: MergeDuplicate): string {
  if (!dup) return ''
  const local = values.value[dup.index] ?? {}
  const server = new Map(dup.duplicateOf.map((d) => [d.name, d.value]))
  return primaryFieldNames.value
    .map((n) => local[n] || server.get(n) || '')
    .filter(Boolean)
    .join(' · ')
}

function statusSeverity(status: MergeDuplicate['status']) {
  if (status === 'to-resolved') return 'warn'
  if (status === 'resolved') return 'success'
  return 'info'
}

function applyLocal(field: MergeField) {
  field.final = field.local
}

function applyServer(field: MergeField) {
  field.final = field.server
}

function updateFinal(field: MergeField, value: string) {
  field.final = value
}

function applyAllLocal() {
  mergeFields.value.forEach((f) => (f.final = f.local))
}

function applyAllServer() {
  mergeFields.value.forEach((f) => (f.final = f.server))
}

function abortMerge() {
  mergeFields.value = buildMergeFields(selectedDuplicate.value, selectedLocal.value)
}

function saveAndNext() {
  const dup = selectedDuplicate.value
  if (!dup) return

  dup.status = 'resolved'

  const next = duplicates.value.findIndex(
    (d, i) => i > selectedIdx.value && d.status !== 'resolved',
  )
  if (next !== -1) {
    selectDuplicate(next)
  } else {
    toast.add({
      severity: 'success',
      summary: t('merge-all-resolved'),
      life: 3000,
    })
  }
}

function goToRecap() {
  //json stringify and parse for avoid proxy creation
  const exclude = new Set(duplicates.value.map((d) => d.index))
  DataStorage.setArray(
    JSON.parse(
      JSON.stringify(cleanContactData(values.value.filter((_, index) => !exclude.has(index)))),
    ),
    DataStorage.getType(),
  )
  DataStorage.setEdit(
    duplicates.value.map((d) => ({
      contactId: d.remoteIndex,
      data: d.duplicateOf,
    })),
  )

  router.push({ name: '/user/contact/creates/recap' })
}

watch(
  mergeFields,
  (list) => {
    const dup = selectedDuplicate.value
    if (!dup) return

    const finals = new Map(list.map((f) => [f.name, f.final]))
    dup.duplicateOf = dup.duplicateOf.map((d) => ({
      ...d,
      value: finals.get(d.name) ?? d.value,
    }))

    const local = { ...values.value[dup.index] }
    list.forEach((f) => {
      local[f.name] = f.final
    })
    values.value[dup.index] = local
  },
  { deep: true },
)

onMounted(async () => {
  loading.value = true
  try {
    types.value = DataStorage.getType()
    typeByName.value = new Map(types.value.map((t) => [t.name, t.type]))
    values.value = cleanContactData(DataStorage.getValue())

    const fetch = await fetchResource(':area/contact/getDuplicate', {
      body: { data: FieldsToIds(values.value) },
    })

    nbDuplicate.value = fetch.nbDuplicate
    duplicates.value = fetch.duplicates.map((d) => ({ ...d, status: 'to-resolved' }))

    duplicates.value.forEach((d) => {
      if (isAutoResolved(d)) d.status = 'auto-resolved'
    })

    if (duplicates.value.length > 0) {
      selectDuplicate(0)
    }
    errored.value = false
  } catch (e) {
    errored.value = true
    throw e
  } finally {
    loading.value = false
  }
})
</script>
