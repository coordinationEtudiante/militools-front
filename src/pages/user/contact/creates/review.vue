<template>
  <Toast />
  <Card class="h-full w-full overflow-scroll">
    <template #title>{{ t('create-contacts.review') }}</template>
    <template #header>
      <!-- progress bar -->
      <div class="row flex h-2 w-full gap-4 p-2">
        <div class="h-2 w-full rounded-full bg-sky-500"></div>
        <div class="h-2 w-full rounded-full bg-sky-500"></div>
        <div class="h-2 w-full rounded-full bg-sky-50"></div>
      </div>
    </template>
    <template #content>
      <div class="flex h-full min-h-0 flex-col gap-2 overflow-scroll">
        <!-- error -->
        <div class="mb-2 w-full border-b border-b-sky-500 text-lg">
          {{ t('create-contacts.review-error-title') }}
        </div>
        <div>
          <div>{{ t('create-contacts.review-error-text') }}</div>
          <div>
            {{
              t('create-contacts.review-error-description', {
                nbData: error.length,
              })
            }}
          </div>
        </div>
        <DataTable
          :value="error"
          paginator
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          dataKey="id"
          filterDisplay="row"
          editMode="cell"
          @cell-edit-complete="onCellEditComplete"
        >
          <Column v-for="(field, index) in fields" :header="field.name" :key="'error-' + index">
            <template #body="{ data }">
              <ColumnData
                :data="{
                  id: 0,
                  createdAt: new Date(),
                  fields: [{ name: field.name, value: data[field.name] }],
                }"
                :type="field"
              />
            </template>
            <template #editor="{ data }">
              <ContactListInput
                :name="field.name"
                :type="field.type"
                v-model:modelValue="data[field.name]"
              />
            </template>
          </Column>
        </DataTable>
        <!-- value -->
        <div class="mb-2 w-full border-b border-b-sky-500 text-lg">
          {{ t('create-contacts.review-title') }}
        </div>
        <div>
          {{
            t('create-contacts.review-description', {
              nbFields: fields.length,
              nbData: data.length,
            })
          }}
        </div>
        <DataTable
          :value="data"
          paginator
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          dataKey="id"
          filterDisplay="row"
          editMode="cell"
          @cell-edit-complete="onCellEditComplete"
        >
          <Column v-for="(field, index) in fields" :header="field.name" :key="'value-' + index">
            <template #body="{ data }">
              <ColumnData
                :data="{
                  id: 0,
                  createdAt: new Date(),
                  fields: [{ name: field.name, value: data[field.name] }],
                }"
                :type="field"
              />
            </template>
            <template #editor="{ data }">
              <ContactListInput
                :name="field.name"
                :type="field.type"
                v-model:modelValue="data[field.name]"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
    <template #footer>
      <Button severity="success" @click="goToMerge">
        {{ t('next') }}
      </Button>
    </template>
  </Card>
</template>
<script setup lang="ts">
import ColumnData from '@/components/contacts/ColumnData.vue'
import ContactListInput from '@/components/contacts/ContactListInput.vue'
import { useAreaStore } from '@/stores/area.store'
import { DataStorage } from '@/stores/contact/creates/dataStorage'
import { objectEntries } from '@vueuse/core'
import { Button, Card, Column, DataTable, Toast, useToast } from 'primevue'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const area = useAreaStore()
const toast = useToast()
const router = useRouter()

const fields = ref<Array<{ name: string; type: string }>>([])
const data = ref<Array<{ [key: string]: string }>>([])
const error = ref<Array<{ [key: string]: string }>>([])

onMounted(() => {
  fields.value = DataStorage.getType()

  const valid: typeof data.value = []
  const invalid: typeof error.value = []

  DataStorage.getValue().forEach((val) => {
    //each fields with type error is in error
    if (
      fields.value.every((f) => {
        // if value dosent have this fields, return true. empty is not an error
        if (typeof val[f.name] === undefined) return true
        //test regex from contactTypeValidator with type of fields
        return area.contactTypeValidator?.get(f.type)?.test(val[f.name]!)
      })
    ) {
      valid.push(val)
    } else {
      invalid.push(val)
    }
  })

  data.value = valid
  error.value = invalid
})

function goToMerge() {
  //json stringify and parse for avoid proxy creation
  DataStorage.setArray(
    JSON.parse(JSON.stringify([...data.value, ...error.value])),
    DataStorage.getType(),
  )

  router.push({ name: '/user/contact/creates/merge' })
}

//table action
function deepEqual(obj1, obj2): boolean {
  if (obj1 === obj2) return true

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}

const onCellEditComplete = (event) => {
  // newData is new data: [key:string: value: string]
  const { data: oldData, newData } = event

  data.value = data.value.filter((item) => !deepEqual(item, oldData))
  error.value = error.value.filter((item) => !deepEqual(item, oldData))

  // update error and data when cell is update.
  if (
    objectEntries(newData).every((d) => {
      if (typeof d[0] != 'string' || !area.fields || !area.contactTypeValidator) return true
      return area.contactTypeValidator
        .get(area.fields.find((f) => f.name == d[0])?.type || '')
        ?.test(d[1])
    })
  ) {
    toast.add({
      severity: 'success',
      summary: t('contact-type-valid'),
      life: 3000,
    })
    data.value = [...data.value, newData]
  } else {
    toast.add({
      severity: 'error',
      summary: t('contact-type-invalid'),
      life: 3000,
    })
    error.value = [...error.value, newData]
  }
}
</script>
