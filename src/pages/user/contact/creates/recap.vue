<template>
  <UCard class="w-full">
    <template #header>
      <div class="flex flex-col gap-2">
        <span class="font-semibold">{{ t('create-contacts.recap') }}</span>
        <div class="row flex h-2 w-full gap-4 p-2">
          <div class="h-2 w-full rounded-full" :class="error ? 'bg-warning' : 'bg-success'" />
          <div class="h-2 w-full rounded-full" :class="error ? 'bg-warning' : 'bg-success'" />
          <div class="h-2 w-full rounded-full" :class="error ? 'bg-warning' : 'bg-success'" />
        </div>
      </div>
    </template>
    <UAlert v-if="error" color="error" size="sm" class="mb-3">
      {{ errorMessage ?? t('error') }}
    </UAlert>
    <div>
      {{ t('create-recap', { nbCreate: successList.length, nbError }) }}
    </div>
    <div v-if="errorValue.length > 0" class="flex flex-col gap-2">
      <div class="text-end">
        <UButton
          color="neutral"
          variant="solid"
          label="Export"
          @click="exportCSV()"
        />
      </div>
      <UTable
        :data="errorValue"
        :columns="recapColumns"
        class="min-w-[50rem]"
      >
        <template #message-cell="{ row }">
          {{ row.original.message }}
        </template>
      </UTable>
    </div>
    <div v-else>
      {{ t('no-error') }}
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { fetchError } from '@/errors/fetch.error'
import { useAreaStore } from '@/stores/area.store'
import { DataStorage } from '@/stores/contact/creates/dataStorage'
import { usePermStore } from '@/stores/perm.store'
import { FieldsToIds } from '@/tools/area.utils'
import { fetchResource } from '@/tools/fetch.utils'
import { useToast } from '@nuxt/ui/composables/useToast'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const area = useAreaStore()
const toast = useToast()
const { getPerms } = usePermStore()

const CHUNK_SIZE = 100

getPerms([
  ':area/contact/creates',
  ':area/contact/edits',
  ':area/contact/getContactFields',
  ':area/contact/getDuplicate',
])

const error = ref<boolean | null>(null)
const errorMessage = ref<string>()
const successList = ref<number[]>([])
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

const recapColumns = computed(() => [
  { accessorKey: 'message', header: t('reason') },
  ...errorColumns.value.map((field) => ({ accessorKey: field, header: field })),
])

const nbError = computed(() => errorList.value.length + editErrorList.value.length)

const progressToast = ref<{ id: string | number } | undefined>()

function showProgress(detail: string) {
  if (!progressToast.value) {
    const added = toast.add({
      color: 'info',
      title: t('creates.progress'),
      description: detail,
      duration: 0,
    })
    progressToast.value = { id: added.id }
  } else {
    toast.update(progressToast.value.id, { description: detail })
  }
}

function finishProgress() {
  if (!progressToast.value) return
  toast.remove(progressToast.value.id)
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
        color: 'success',
        title: t('creates.done'),
        duration: 3000,
      })
    }
  } catch (e) {
    error.value = true
    const message = e instanceof fetchError ? e.message : String(e)
    errorMessage.value = message
    toast.add({
      color: 'error',
      title: t('error'),
      description: message,
      duration: 5000,
    })
  } finally {
    finishProgress()
  }
})

const exportCSV = () => {
  const cols = ['message', ...errorColumns.value]
  const header = cols.join(',')
  const rows = errorValue.value.map((row) =>
    cols.map((c) => `"${String(row[c] ?? '').replace(/"/g, '""')}"`).join(','),
  )
  const csv = [header, ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'errors.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
