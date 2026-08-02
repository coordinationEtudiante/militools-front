<script setup lang="ts">
import MCard from '@/components/MCard.vue'
import { Button, Column, DataTable, InputText } from 'primevue'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getContacts } from '@/cloud-functions/contacts/getContacts'

const { t } = useI18n()

interface FlatContact {
  id: number
  createdAt: string
  [key: string]: string | number
}

const selectedContacts = ref<FlatContact[]>([])
const search = ref('')

const result = getContacts({ filters: [{ name: '*', value: '' }] }, false)
const { isLoading, data } = result

onMounted(async () => {
  await result.doFetch()
})

const contacts = computed(() => data.value?.value ?? [])
const fieldDefs = computed(() => data.value?.fields ?? [])

const flatContacts = computed<FlatContact[]>(() =>
  contacts.value.map((c) => {
    const flat: FlatContact = { id: c.id, createdAt: c.createdAt }
    for (const f of c.fields) {
      flat[f.name] = f.value
    }
    return flat
  }),
)

const globalFilterFields = computed<string[]>(() => [
  'id',
  'createdAt',
  ...fieldDefs.value.map((f) => f.name),
])
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
            {{ t('here-list-n-user', { nb: flatContacts.length }) }}
          </div>
        </div>
        <span class="flex items-center gap-2">
          <InputText v-model="search" :placeholder="t('contact.search')" class="w-64" />
          <Button severity="secondary" outlined :disabled="!selectedContacts.length">
            {{ t('contact.delete-selected', { nb: selectedContacts.length }) }}
          </Button>
        </span>
      </div>
    </template>

    <DataTable
      v-model:selection="selectedContacts"
      :value="flatContacts"
      :globalFilter="search"
      :globalFilterFields="globalFilterFields"
      dataKey="id"
      stripedRows
      paginator
      :rows="20"
      :rowsPerPageOptions="[10, 20, 50, 100]"
      :loading="isLoading"
      sortMode="multiple"
      removableSort
      :virtualScrollerOptions="{ itemSize: 46 }"
      scrollable
      scrollHeight="flex"
      tableStyle="min-width: 50rem"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem" />
      <Column field="id" header="ID" sortable style="min-width: 6rem" />
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
        style="min-width: 8rem"
      />
      <template #empty>
        <div class="py-8 text-center text-gray-500">
          {{ t('is-empty') }}
        </div>
      </template>
    </DataTable>
  </MCard>
</template>
