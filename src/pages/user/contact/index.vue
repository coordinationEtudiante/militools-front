<script setup lang="ts">
import MCard from '@/components/MCard.vue'
import Dicebear from '@/components/Dicebear.vue'
import { getContacts, type GetContactOptions } from '@/cloud-functions/contacts/getContacts'
import { Button, Column, DataTable, InputText } from 'primevue'
import type { DataTableSortEvent, DataTableSortMeta } from 'primevue/datatable'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface FlatContact {
  id: number
  createdAt: string
  [key: string]: string | number
}

interface ColumnFilter {
  value: string | null
  matchMode: string
}

const selectedContacts = ref<FlatContact[]>([])
const first = ref(0)
const rows = ref(20)
const filters = ref<Record<string, ColumnFilter>>({})
const sortMeta = ref<DataTableSortMeta[]>([])

const result = getContacts(undefined, false)
const { isLoading, data } = result

const contacts = computed(() => data.value?.value ?? [])
const fieldDefs = computed(() => data.value?.fields ?? [])
const nbVal = computed(() => data.value?.number ?? 0)

const flatContacts = computed<FlatContact[]>(() =>
  contacts.value.map((c) => {
    const flat: FlatContact = { id: c.id, createdAt: c.createdAt.toString() }
    for (const f of c.fields) {
      flat[f.name] = f.value
    }
    return flat
  }),
)

watch(
  fieldDefs,
  (defs) => {
    const next = { ...filters.value }
    for (const def of defs) {
      if (!next[def.name]) next[def.name] = { value: null, matchMode: 'contains' }
    }
    filters.value = next
  },
  { immediate: true },
)

function buildOptions(): GetContactOptions {
  const active = Object.entries(filters.value)
    .filter(([, f]) => f.value != null && String(f.value).trim() !== '')
    .map(([name, f]) => ({ name, value: String(f.value).trim() }))
  return {
    filters: active.length ? active : [{ name: '*', value: '' }],
    limit: rows.value,
    offset: first.value,
    sort: sortMeta.value
      .filter((s) => s.order !== 0)
      .map((s) => ({ field: s.field as 'id' | 'createdAt' | 'updatedAt', desc: s.order === -1 })),
  }
}

function fetchContacts() {
  return result.doFetch(buildOptions())
}

function onPage() {
  fetchContacts()
}

function onSort(event: DataTableSortEvent) {
  sortMeta.value = event.multiSortMeta ?? []
  first.value = 0
  fetchContacts()
}

function onFilter() {
  first.value = 0
  fetchContacts()
}

onMounted(() => {
  fetchContacts()
})
</script>

<template>
  <MCard class="w-full">
    <template #header>
      <div class="flex items-center justify-between gap-4">
        <div>
          <div class="text-2xl tracking-tighter text-balance text-gray-950">
            {{ t('contacts') }}
          </div>
          <div v-if="!isLoading" class="text-xl">
            {{ t('here-list-n-user', { nb: nbVal }) }}
          </div>
        </div>
        <div class="flex gap-2">
          <RouterLink to="/user/contact/create">
            <Button severity="contrast">{{ t('create-one') }}</Button>
          </RouterLink>
          <RouterLink to="/user/contact/creates/">
            <Button severity="contrast">{{ t('import-file') }}</Button>
          </RouterLink>
          <Button severity="secondary" outlined :disabled="!selectedContacts.length">
            {{ t('contact.delete-selected', { nb: selectedContacts.length }) }}
          </Button>
        </div>
      </div>
    </template>

    <DataTable
      v-model:selection="selectedContacts"
      v-model:filters="filters"
      v-model:first="first"
      v-model:rows="rows"
      :value="flatContacts"
      dataKey="id"
      stripedRows
      paginator
      :totalRecords="nbVal"
      :rowsPerPageOptions="[10, 20, 50, 100]"
      :loading="isLoading"
      lazy
      filterDisplay="row"
      sortMode="multiple"
      removableSort
      scrollable
      scrollHeight="flex"
      tableStyle="min-width: 50rem"
      @page="onPage"
      @filter="onFilter"
      @sort="onSort"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem" />
      <Column field="id" header="ID" sortable style="min-width: 6rem">
        <template #body="{ data }"><Dicebear :size="24" :seed="data.id.toString()" /></template>
      </Column>
      <Column field="createdAt" :header="t('contact.created-at')" sortable style="min-width: 10rem">
        <template #body="{ data }">
          {{ new Date(data.createdAt).toLocaleString() }}
        </template>
      </Column>
      <Column
        v-for="def in fieldDefs"
        :key="def.name"
        :field="def.name"
        :header="def.name"
        sortable
        :filter="true"
        style="min-width: 8rem"
      >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="w-full"
            :placeholder="def.name"
            @keydown.enter.prevent="filterCallback()"
          />
        </template>
      </Column>
      <template #empty>
        <div class="py-8 text-center text-gray-500">
          {{ t('is-empty') }}
        </div>
      </template>
    </DataTable>
  </MCard>
</template>
