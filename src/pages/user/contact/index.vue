<script setup lang="ts">
import MCard from '@/components/MCard.vue'
import Dicebear from '@/components/Dicebear.vue'
import { getContacts, type GetContactOptions } from '@/cloud-functions/contacts/getContacts'
import { exportContactCSV } from '@/cloud-functions/contacts/exportCSV'
import { computed, onMounted, ref, watch } from 'vue'
import type { PaginationState, SortingState } from '@tanstack/vue-table'
import { useI18n } from 'vue-i18n'
import { usePermStore } from '@/stores/perm.store'
import { fetchResource } from '@/tools/fetch.utils'

const { t } = useI18n()
const { getPerm, getPerms } = usePermStore()

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
const sorting = ref<SortingState>([])
const pagination = ref<PaginationState>({ pageIndex: 0, pageSize: 20 })
const rowSelection = ref<Record<string, boolean>>({})

const result = getContacts(undefined, false)
const { isLoading, data } = result

const contacts = computed(() => data.value?.value ?? [])
const fieldDefs = computed(() => data.value?.fields ?? [])
const nbVal = computed(() => data.value?.number ?? 0)

const isCreatesPerm = getPerms(
  [
    ':area/contact/creates',
    ':area/contact/edits',
    ':area/contact/getContactFields',
    ':area/contact/getDuplicate',
  ],
  false,
)
const isCreatePerm = getPerm(':area/contact/create', false)
const isExportPerm = getPerm(':area/contact/exportCSV', false)
const isDeletePerm = getPerm(':area/contact/delete', false)

const flatContacts = computed<FlatContact[]>(() =>
  contacts.value.map((c) => {
    const flat: FlatContact = { id: c.id, createdAt: c.createdAt.toString() }
    for (const f of c.fields) {
      flat[f.name] = f.value
    }
    return flat
  }),
)

const contactColumns = computed(() => {
  const cols: { accessorKey?: string; id?: string; header: string; enableSorting?: boolean }[] = [
    { id: 'select', header: '' },
    { accessorKey: 'id', header: 'ID', enableSorting: true },
    { accessorKey: 'createdAt', header: t('contact.created-at'), enableSorting: true },
  ]
  for (const def of fieldDefs.value) {
    cols.push({ accessorKey: def.name, header: def.name, enableSorting: true })
  }
  return cols
})

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
    sort: sorting.value.map((s) => ({
      field: s.id as 'id' | 'createdAt' | 'updatedAt',
      desc: s.desc,
    })),
  }
}

function fetchContacts() {
  return result.doFetch(buildOptions())
}

function onFilter() {
  first.value = 0
  pagination.value.pageIndex = 0
  fetchContacts()
}

watch(pagination, (p) => {
  first.value = p.pageIndex * p.pageSize
  rows.value = p.pageSize
  fetchContacts()
}, { deep: true })

watch(sorting, () => {
  first.value = 0
  pagination.value.pageIndex = 0
  fetchContacts()
}, { deep: true })

watch(rows, (v) => { pagination.value.pageSize = Number(v) })

watch(rowSelection, () => {
  selectedContacts.value = flatContacts.value.filter((c) => rowSelection.value[String(c.id)])
}, { deep: true })

function onExportCSV() {
  exportContactCSV({ fields: '*' })
}

async function onDeletedContact() {
  for (const contact of selectedContacts.value) {
    await fetchResource(':area/contact/delete', { query: { contactId: contact.id } })
    if (data.value) {
      data.value.value = data.value.value.filter((e) => e.id !== contact.id)
    }
  }
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
          <div class="text-2xl tracking-tighter text-balance text-highlighted">
            {{ t('contacts') }}
          </div>
          <div v-if="!isLoading" class="text-xl">
            {{ t('here-list-n-user', { nb: nbVal }) }}
          </div>
        </div>
        <div class="flex gap-2">
          <UButton v-if="isExportPerm" color="neutral" variant="solid" @click="onExportCSV">
            {{ t('export-csv') }}
          </UButton>
          <RouterLink to="/user/contact/create" v-if="isCreatePerm">
            <UButton color="neutral" variant="solid">{{ t('create-one') }}</UButton>
          </RouterLink>
          <RouterLink to="/user/contact/creates/" v-if="isCreatesPerm">
            <UButton color="neutral" variant="solid">{{ t('import-file') }}</UButton>
          </RouterLink>
          <UButton
            color="neutral"
            variant="solid"
            :disabled="!selectedContacts.length"
            v-if="isDeletePerm"
            @click="onDeletedContact"
          >
            {{ t('contact.delete-selected', { nb: selectedContacts.length }) }}
          </UButton>
        </div>
      </div>
    </template>

    <!-- Filters row -->
    <div v-if="fieldDefs.length" class="mb-2 flex flex-wrap gap-2">
      <UInput
        v-for="def in fieldDefs"
        :key="def.name"
        :model-value="filters[def.name].value ?? ''"
        @update:model-value="(v: string) => (filters[def.name].value = v)"
        type="text"
        class="w-40"
        :placeholder="def.name"
        @keydown.enter.prevent="onFilter"
      />
    </div>

    <UTable
      :data="flatContacts"
      :columns="contactColumns"
      v-model:sorting="sorting"
      v-model:row-selection="rowSelection"
      manual-sorting
      manual-pagination
      manual-filtering
      :loading="isLoading"
      :get-row-id="(row: FlatContact) => String(row.id)"
      class="min-w-[50rem]"
    >
      <template #select-header="{ table }">
        <UCheckbox
          :model-value="table.getIsAllPageRowsSelected()"
          @update:model-value="table.toggleAllPageRowsSelected()"
        />
      </template>
      <template #select-cell="{ row }">
        <UCheckbox
          :model-value="row.getIsSelected()"
          @update:model-value="row.toggleSelected()"
        />
      </template>
      <template #id-cell="{ row }">
        <Dicebear :size="24" :seed="row.original.id.toString()" />
      </template>
      <template #createdAt-cell="{ row }">
        {{ new Date(row.original.createdAt).toLocaleString() }}
      </template>
      <template #empty>
        <div class="py-8 text-center text-muted">
          {{ t('is-empty') }}
        </div>
      </template>
    </UTable>

    <div class="mt-4 flex items-center justify-between">
      <UPagination
        :page="pagination.pageIndex + 1"
        :items-per-page="pagination.pageSize"
        :total="nbVal"
        @update:page="(p: number) => (pagination.pageIndex = p - 1)"
      />
      <USelect
        v-model="rows"
        :options="[10, 20, 50, 100]"
        class="w-24"
      />
    </div>
  </MCard>
</template>
