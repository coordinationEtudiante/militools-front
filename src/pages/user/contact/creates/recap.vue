<template>
  <Toast />
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
      <Message v-if="error" severity="error" variant="simple" class="mb-3">
        {{ errorMessage ?? t('error') }}
      </Message>
      <div>
        {{ t('create-recap', { nbCreate: successList.length, nbError }) }}
      </div>
      <DataTable
        v-if="errorValue.length > 0"
        :value="errorValue"
        ref="dt"
        :sortField="'message'"
        :sortOrder="1"
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
          field="message"
          :header="t('reason')"
          :exportHeader="t('reason')"
          sortable
        />
        <Column
          v-for="field in errorColumns"
          :key="field"
          :field="field"
          :header="field"
          :exportHeader="field"
        />
      </DataTable>
      <div v-else>
        {{ t('no-error') }}
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { fetchError } from '@/errors/fetch.error'
import { useAreaStore } from '@/stores/area.store'
import { DataStorage } from '@/stores/contact/creates/dataStorage'
import { FieldsToIds } from '@/tools/area.utils'
import { fetchResource } from '@/tools/fetch.utils'
import { Button, Card, Column, DataTable, Message, Toast, useToast } from 'primevue'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const area = useAreaStore()
const toast = useToast()

const CHUNK_SIZE = 100

const error = ref<boolean | null>(null)
const errorMessage = ref<string>()
const successList = ref<number[]>([])
const dt = ref()
const errorList = ref<
  {
    index: number
    message: string
  }[]
>([])
const editErrorList = ref<
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

const errorColumns = computed(() => {
  const keys = new Set<string>()
  for (const row of errorValue.value) {
    for (const key of Object.keys(row)) {
      if (key !== 'message') keys.add(key)
    }
  }
  return area.fields
    .map((f) => f.name)
    .filter((name) => keys.has(name))
    .concat([...keys].filter((key) => !area.fields.some((f) => f.name === key)))
})

const nbError = computed(() => errorList.value.length + editErrorList.value.length)

const progressToast = ref<
  | { severity: string; summary: string; detail: string; sticky: boolean; closable: boolean }
  | undefined
>()

function showProgress(detail: string) {
  if (!progressToast.value) {
    progressToast.value = {
      severity: 'info',
      summary: t('creates.progress'),
      detail,
      sticky: true,
      closable: false,
    }
    toast.add(progressToast.value)
  } else {
    progressToast.value.detail = detail
  }
}

function finishProgress() {
  if (!progressToast.value) return
  toast.remove(progressToast.value)
  progressToast.value = undefined
}

function editToRow(data: { id: number; value: string }[]): Record<string, string> {
  const row: Record<string, string> = {}
  for (const field of data) {
    const name = area.fields.find((f) => f.id === field.id)?.name
    if (name) row[name] = field.value
  }
  return row
}

onMounted(async () => {
  const value = DataStorage.getValue()
  const edit = DataStorage.getEdit()

  try {
    if (value.length > 0) {
      for (let i = 0; i < value.length; i += CHUNK_SIZE) {
        const chunk = value.slice(i, i + CHUNK_SIZE)
        showProgress(`${Math.min(i + CHUNK_SIZE, value.length)}/${value.length}`)

        const createValue = await fetchResource(':area/contact/creates', {
          body: { data: FieldsToIds(chunk) },
        })
        if (createValue == undefined) return (error.value = true)
        errorList.value = errorList.value.concat(
          createValue.errors.map((e) => ({ ...e, index: e.index + i })),
        )
        successList.value = successList.value.concat(createValue.created)
      }
    }

    if (edit.length > 0) {
      for (let i = 0; i < edit.length; i += CHUNK_SIZE) {
        const chunk = edit.slice(i, i + CHUNK_SIZE)
        showProgress(`${Math.min(i + CHUNK_SIZE, edit.length)}/${edit.length}`)

        const editValue = await fetchResource(':area/contact/edits', { body: { data: chunk } })
        if (editValue == undefined) return (error.value = true)
        editErrorList.value = editErrorList.value.concat(
          editValue.errors.map((e) => ({ ...e, index: e.index + i })),
        )
        successList.value = successList.value.concat(editValue.updated)
      }
    }

    error.value = false

    const editRows = edit.map((e) => editToRow(e.data))
    errorValue.value = [
      ...errorList.value.map((el) => ({ message: el.message, ...value.at(el.index) })),
      ...editErrorList.value.map((el) => ({ message: el.message, ...editRows.at(el.index) })),
    ]
      .filter((e): e is { message: string; [key: string]: string } => e != undefined)
      .sort((a, b) => a.message.localeCompare(b.message))

    if (nbError.value === 0) {
      toast.add({
        severity: 'success',
        summary: t('creates.done'),
        life: 3000,
      })
    }
  } catch (e) {
    error.value = true
    const message = e instanceof fetchError ? e.message : String(e)
    errorMessage.value = message
    toast.add({
      severity: 'error',
      summary: t('error'),
      detail: message,
      life: 5000,
    })
  } finally {
    finishProgress()
  }
})

const exportCSV = () => {
  dt.value.exportCSV()
}
</script>
