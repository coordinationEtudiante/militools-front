<template>
  <Card class="w-full">
    <template #title>{{ t('create-contacts.recap') }}</template>
    <template #header>
      <!-- progress bar -->
      <div class="row flex h-2 w-full gap-4 p-2">
        <div class="h-2 w-full rounded-full" :class="error ? 'bg-amber-500' : 'bg-emerald-500'" />
        <div class="h-2 w-full rounded-full" :class="error ? 'bg-amber-500' : 'bg-emerald-500'" />
        <div class="h-2 w-full rounded-full" :class="error ? 'bg-amber-500' : 'bg-emerald-500'" />
      </div>
    </template>
    <template #content>
      <div>
        {{ t('create-recap', { nbCreate: successList.length, nbError: errorList.length }) }}
      </div>
      <DataTable
        v-if="errorValue.length > 1"
        :value="errorValue"
        ref="dt"
        tableStyle="min-width: 50rem"
      >
        <template #header>
          <div class="pb-4 text-end">
            <Button
              icon="pi pi-external-link"
              severity="contrast"
              label="Export"
              @click="exportCSV()"
            />
          </div>
        </template>
        <Column
          v-for="field in area.primaryFields"
          :key="field.id"
          :field="field.name"
          :header="field.name"
          :exportHeader="field.name"
        />
      </DataTable>
      <div v-else>
        {{ t('no-error') }}
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { useAreaStore } from '@/stores/area.store'
import { DataStorage } from '@/stores/contact/creates/dataStorage'
import { FieldsToIds } from '@/tools/area.utils'
import { fetchResource } from '@/tools/fetch.utils'
import { Card, Column, DataTable } from 'primevue'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const area = useAreaStore()

const error = ref<boolean | null>(null)
const successList = ref<number[]>([])
const dt = ref()
const errorList = ref<
  {
    index: number
    message: string
  }[]
>([])
const errorValue = ref<
  {
    [key: string]: string
  }[]
>([])

onMounted(async () => {
  const value = DataStorage.getValue()

  if (value.length > 0) {
    const createValue = await fetchResource(':area/contact/creates', {
      body: { data: FieldsToIds(value) },
    })
    if (!createValue[0] || createValue[1] == undefined) return (error.value = true)
    errorList.value = errorList.value.concat(errorList.value, createValue[1].errors)
    successList.value = successList.value.concat(successList.value, createValue[1].created)
  }

  const edit = DataStorage.getEdit()
  if (edit.length > 0) {
    const editValue = await fetchResource(':area/contact/edits', { body: { data: edit } })
    if (!editValue[0] || editValue[1] == undefined) return (error.value = true)
    errorList.value = errorList.value.concat(errorList.value, editValue[1].errors)
    successList.value = successList.value.concat(successList.value, editValue[1].updated)
  }

  errorValue.value = errorList.value.map((el) => value.at(el.index)).filter((e) => e != undefined)
})

const exportCSV = () => {
  dt.value.exportCSV()
}
</script>
