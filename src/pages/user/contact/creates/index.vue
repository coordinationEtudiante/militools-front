<template>
  <Toast />
  <CreateField v-model:visible="showCreateFieldsModal" />
  <Card
    class="h-full w-full overflow-hidden"
    :pt="{
      body: { class: 'h-full flex flex-col min-h-0' },
      content: { class: 'h-full flex flex-col min-h-0 overflow-hidden' },
    }"
  >
    <template #title>{{ t('create-contacts.title') }}</template>
    <template #header>
      <!-- progress bar -->
      <div class="row flex h-2 w-full gap-4 p-2">
        <div class="h-2 w-full rounded-full bg-sky-500"></div>
        <div class="h-2 w-full rounded-full bg-sky-50"></div>
        <div class="h-2 w-full rounded-full bg-sky-50"></div>
      </div>
    </template>
    <template #content>
      <div class="flex h-full min-h-0 flex-col gap-2 overflow-hidden">
        <!-- MARK: import -->
        <div class="mb-2 w-full border-b border-b-sky-500 text-lg">
          {{ t('create-contacts.import-title') }}
        </div>
        <div>
          <div>{{ t('create-contacts.import-text') }}</div>
          <div>
            {{ t('create-contacts.import-description', { fields: primaryFieldsName }) }}
          </div>
        </div>
        <div
          class="flex w-max flex-row gap-2 rounded-lg border-2 p-2"
          :class="
            (files?.length ?? 0) >= 1
              ? 'border-sky-500'
              : !errored
                ? 'border-amber-500'
                : 'border-red-500'
          "
        >
          <button
            class="text-gray-300-contrast rounded-lg bg-gray-300 p-2"
            type="button"
            @click="open()"
          >
            {{ t('choose-file') }}
          </button>
          <button type="button" :disabled="!files" @click="reset()">{{ t('reset') }}</button>
          <span class="flex w-max items-center gap-2" v-if="files">
            <p>{{ t('you-have-selected') }}</p>
            <span v-for="file of files" :key="file.name">
              {{ file.name }}
            </span>
          </span>
        </div>
        <!-- MARK: select field -->
        <div class="my-2 w-full border-b border-b-sky-500 text-lg">
          {{ t('create-contacts.select-field-title') }}
        </div>
        <div>
          {{
            t('create-contacts.select-field-text', {
              nbFields: csvFields.length,
              nbRows: csvValue.length,
            })
          }}
        </div>
        <table>
          <tr class="border-b-2 border-white">
            <th>{{ t('column-name') }}</th>
            <th>{{ t('column-number-data') }}</th>
            <th>{{ t('column-number-error') }}</th>
            <th class="flex items-center justify-center">
              {{ t('field') }}
              <Button
                severity="secondary"
                text
                @click="toggleModalCreateField"
                v-if="createFieldPerm"
              >
                <CirclePlus />
              </Button>
            </th>
            <th>{{ t('field-number-data') }}</th>
            <th>{{ t('action') }}</th>
          </tr>
          <tr v-for="slot in csvFields" :key="slot.name">
            <th class="pb-1">{{ slot.name }}</th>
            <th class="pb-1">{{ countValidValue(slot) }}</th>
            <th class="pb-1">{{ getNbError(slot.name).value }}</th>
            <th class="pb-1">
              <Select
                v-model="slot.newName"
                :options="area.fields.map((f) => f.name)"
                @update:modelValue="applySelectedField($event, slot.name)"
                placeholder="Select"
                fluid
              />
            </th>
            <th>
              <div class="flex flex-row justify-center gap-2">
                <span>
                  <DatabaseCheck />
                  {{ getNumberValueInField(csvFields, slot.newName ?? slot.name) }}
                </span>
                <Divider layout="vertical" />
                <span>
                  <DatabaseArrowUp />
                  {{ countValidValue(slot) }}
                </span>
              </div>
            </th>
            <th class="flex justify-center gap-1">
              <Button
                variant="outlined"
                rounded
                severity="secondary"
                :disabled="!clearableField(slot)"
                @click="clearField(slot)"
              >
                <Zap />
              </Button>
              <Button variant="outlined" rounded severity="secondary" @click="Deletecolumn(slot)">
                <Trash2 />
              </Button>
            </th>
          </tr>
        </table>
      </div>
    </template>
    <!-- MARK: footer -->
    <template #footer>
      <Button severity="success" @click="goToReview" :disabled="!allTypeCompleted">
        {{ t('next') }}
      </Button>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { Zap, Trash2, CirclePlus, DatabaseCheck, DatabaseArrowUp } from '@lucide/vue'
import { useAreaStore } from '@/stores/area.store'
import { DataStorage } from '@/stores/contact/creates/dataStorage'
import { getNumberValueInField } from '@/tools/area.utils'
import { clearPhone } from '@/tools/phone.utils'
import { useFileDialog } from '@vueuse/core'
import Papa from 'papaparse'
import { Button, Card, Divider, Select, Toast } from 'primevue'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import CreateField from '@/components/contacts/CreateField.vue'
import { clearEmail } from '@/tools/string.utils'
import { usePermStore } from '@/stores/perm.store'

const toast = useToast()
const { t } = useI18n()
const area = useAreaStore()
const router = useRouter()
const { getPerms, getPerm } = usePermStore()

const loading = ref(false)
const errored = ref(false)

getPerms([
  ':area/contact/creates',
  ':area/contact/edits',
  ':area/contact/getContactFields',
  ':area/contact/getDuplicate',
])

const createFieldPerm = getPerm(':area/contact/createContactFields', false)
//// file dialog \\\\

const { files, open, reset, onChange } = useFileDialog({
  accept: '.csv',
  directory: false,
  multiple: false,
})

type CsvField = {
  name: string
  type: string | null
  newName?: string
}
// CSV fields extracted from header: [{ name, type }]
const csvFields = ref<CsvField[]>([])
const csvValue = ref<{ [key: string]: string }[]>([])
const typeErrors = ref<Record<string, number>>({})
const showCreateFieldsModal = ref(false)

const primaryFieldsName = computed(() => area.primaryFields.map((p) => p.name).join(', '))
const allTypeCompleted = computed(() => csvFields.value.every((csv) => typeof csv.type == 'string'))
const getNbError = (name: string) => computed(() => typeErrors.value[name])

const processFile = (file: File) => {
  loading.value = true

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      loading.value = false
      try {
        const headers = (results && results.meta && results.meta.fields) || []
        csvFields.value = headers.map((h: string) => ({ name: h, type: null, edit: false }))
        csvValue.value = results.data as { [key: string]: string }[]
        typeErrors.value = {}
        errored.value = false
        csvFields.value.forEach((csv) => updateFieldIfKnow(csv, csv.name))
      } catch (e) {
        console.error('Error reading headers:', e)
        errored.value = true
      }
    },
    error: (error) => {
      console.error('Error parsing file:', error)
      loading.value = false
      errored.value = true
    },
  })
}

const countValidValue = (column: CsvField) =>
  computed(
    () =>
      csvValue.value.reduce((acc, v) => {
        return acc + (v[column.name] ? 1 : 0)
      }, 0) - (typeErrors.value[column.name] ?? 0),
  )

onChange((newFiles) => {
  if (newFiles && newFiles.length > 0 && newFiles[0]) {
    errored.value = false
    processFile(newFiles[0])
  }
})

function toggleModalCreateField() {
  showCreateFieldsModal.value = true
}

//// column action \\\\

const Deletecolumn = (column: CsvField) => {
  csvFields.value = csvFields.value.filter((field) => field.name != column.name)
  delete typeErrors.value[column.name]
}

const onTypeChange = (column: CsvField, selectedType: string | null | undefined) => {
  const validator = area.contactTypeValidator?.get(selectedType ?? '')
  if (!validator) {
    typeErrors.value[column.name] = 0
    return
  }

  let nbError = 0
  csvValue.value.forEach((val) => {
    const cellValue = val[column.name]
    if (cellValue !== undefined && !validator.test(cellValue)) {
      nbError++
    }
  })
  typeErrors.value[column.name] = nbError
}

const applySelectedField = (value: string | null, oldName: string) => {
  if (!value) return

  const field = csvFields.value.find((item) => item.name === oldName)
  if (!field) {
    return
  }

  field.newName = value

  updateFieldIfKnow(field, field.newName)
}

const updateFieldIfKnow = (field: CsvField, value: string | null | undefined) => {
  if (!value || !area.fields) return

  const index = area.fields.findIndex((f) => f.name == value)
  if (index < 0) return

  const fieldToEdit = csvFields.value.find((item) => item.name === field.name)
  const newType = area.fields[index]?.type
  if (!fieldToEdit || !newType) {
    return
  }

  fieldToEdit.type = newType
  onTypeChange(fieldToEdit, newType)
}

const localeMessages = Object.values(
  import.meta.glob('../../../../../locales/*.json', {
    eager: true,
    import: 'default',
  }),
) as Record<string, string>[]

const phoneFieldNames = [
  'phone',
  'tel',
  'num',
  ...localeMessages.flatMap((messages) => [
    messages['validator.phone'],
    messages['validator.phone-number'],
  ]),
]
const emailFieldNames = [
  'mail',
  'email',
  'mel',
  ...localeMessages.flatMap((messages) => [
    messages['validator.email'],
    messages['validator.email-adress'],
  ]),
]

const clearableField = (field: CsvField) =>
  phoneFieldNames.includes((field.newName ?? field.name).toLowerCase()) ||
  emailFieldNames.includes((field.newName ?? field.name).toLowerCase())

const clearField = (field: CsvField) => {
  if (!clearableField(field)) return

  const nbPreviousError = typeErrors.value[field.name] ?? 0

  csvValue.value.forEach((v) => {
    const isPhone = phoneFieldNames.includes((field.newName ?? field.name).toLowerCase())
    const isMail = emailFieldNames.includes((field.newName ?? field.name).toLowerCase())
    if (v[field.name] && (isPhone || isMail))
      v[field.name] = isPhone ? clearPhone(v[field.name]!) : clearEmail(v[field.name]!)
  })

  onTypeChange(field, field.type)

  toast.add({
    severity: 'success',
    summary: t('column-clean'),
    detail: t('nb-row-clean', {
      nbClean: nbPreviousError - (typeErrors.value[field.name] ?? 0),
      nbError: typeErrors.value[field.name] ?? 0,
    }),
    life: 3000,
  })
}

//// send \\\\

function goToReview() {
  if (!allTypeCompleted.value) {
    toast.add({
      severity: 'error',
      summary: t('not-all-fields-define'),
      life: 3000,
    })
    return
  }

  DataStorage.setArray(
    csvValue.value.map((v) => {
      return Object.fromEntries(
        csvFields.value
          .map((f) => (v[f.name] ? [f.newName ?? f.name, v[f.name]] : []))
          .filter((entry): entry is [string, string] => entry.length === 2),
      )
    }),
    csvFields.value.map((f) => {
      return { name: f.newName ?? f.name, type: f.type! }
    }),
  )

  router.push({ name: '/user/contact/creates/review' })
}
</script>
