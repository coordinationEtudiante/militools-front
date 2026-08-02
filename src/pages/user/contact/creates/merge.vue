<template>
  <div v-if="errored">{{ t('error') }}</div>
  <div v-else class="flex h-full flex-col gap-2">
    <Card class="w-full">
      <template #title>{{ t('merge') }}</template>
      <template #content>
        <!-- progress bar -->
        <div class="row flex h-2 w-full gap-4">
          <div class="h-2 w-full rounded-full bg-sky-500"></div>
          <div class="h-2 w-full rounded-full bg-sky-500"></div>
          <div class="h-2 w-full rounded-full bg-sky-500"></div>
        </div>
      </template>
    </Card>
    <div class="flex h-full w-full flex-row gap-2">
      <Card class="w-full flex-2">
        <template #header>
          <h1 class="m-2 text-xl text-gray-950">
            {{ t('duplications-detected', { nbDuplicate: nbDuplicate ?? '...' }) }}
          </h1>
        </template>
        <template #content>
          <div>
            <div class="flex justify-between gap-2 px-3">
              <span>{{ t('duplication-status') }}</span>
              <span v-for="(field, i) in showField" :key="`label ${i}`">{{ field.name }}</span>
            </div>
            <div class="flex flex-col gap-2">
              <Button
                class="w-full"
                v-for="(data, i) in duplicate"
                :key="`button ${i}`"
                :class="{ 'ring-2 ring-blue-300': selectedField === data.index }"
                severity="secondary"
                @click="selectDuplicate(data.index)"
              >
                <div class="flex w-full items-center justify-between gap-2">
                  <Tag
                    icon="pi pi-exclamation-triangle"
                    :severity="getSeverityFromStatus(`duplication.${data.status}`)"
                    :value="t(`duplication.${data.status}`)"
                  />
                  <span v-for="(key, j) in showField" :key="`span ${j}`">
                    {{ data.duplicateOf.find((d) => d.name == key.name)?.value }}
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </template>
      </Card>
      <Card class="flex-3" style="height: 100%">
        <template #header>
          <h1
            class="m-2 flex items-center gap-2 text-xl text-gray-950"
            v-if="values[selectedField] !== undefined"
          >
            <!-- TODO replace this when identifer of contact is defined -->
            {{ values[selectedField]!['nom'] }}
            <Tag
              icon="pi pi-exclamation-triangle"
              :severity="
                getSeverityFromStatus(
                  `duplication.${duplicate.find((d) => d.index == selectedField)?.status}`,
                )
              "
              :value="t(`duplication.${duplicate.find((d) => d.index == selectedField)?.status}`)"
            />
          </h1>
        </template>
        <template #content>
          <table class="w-full">
            <tr class="border-b-2 border-white">
              <th
                class="bg-surface-50 rounded-tl-xl border-r-2 border-white"
                aria-label="name of fields"
              ></th>
              <th class="bg-surface-50 rounded-tr-xl">{{ t('local-version') }}</th>
              <th aria-label="application button"></th>
              <th class="rounded-t-xl bg-blue-100">{{ t('final-version') }}</th>
              <th aria-label="application button"></th>
              <th class="bg-surface-50 rounded-t-xl">{{ t('server-version') }}</th>
            </tr>
            <tr v-for="(data, i) in duplicateServerVal" :key="data.id">
              <th
                class="bg-surface-50 border-r-2 border-white"
                :class="i == (duplicateServerVal?.length ?? 0) - 1 ? 'rounded-bl-xl' : ''"
              >
                {{ data.name }}
              </th>
              <th
                class="bg-surface-50"
                :class="i == (duplicateServerVal?.length ?? 0) - 1 ? 'rounded-br-xl' : ''"
              >
                {{ values[selectedField]?.[data.name] }}
              </th>
              <th>
                <Button
                  variant="text"
                  severity="info"
                  icon="pi pi-angle-double-right"
                  @click.stop="applyRowLocal(data.name)"
                />
              </th>
              <th
                class="bg-blue-100"
                :class="i == (duplicateServerVal?.length ?? 0) - 1 ? 'rounded-b-xl' : ''"
              >
                {{ finalValues[data.name] }}
              </th>
              <th>
                <Button
                  variant="text"
                  severity="info"
                  icon="pi pi-angle-double-left"
                  @click.stop="applyRowServer(data.name)"
                />
              </th>
              <th
                class="bg-surface-50"
                :class="i == (duplicateServerVal?.length ?? 0) - 1 ? 'rounded-b-xl' : ''"
              >
                {{ data.value }}
              </th>
            </tr>
          </table>
        </template>
        <template #footer>
          <div class="flex w-full justify-center gap-2 align-bottom">
            <Button @click="applyAllLocal">{{ t('aplicate-local') }}</Button>
            <Button @click="applyAllServer">{{ t('aplicate-server') }}</Button>
            <Button @click="saveAndNext">{{ t('save-and-next') }}</Button>
            <Button @click="abortMerge">{{ t('abort') }}</Button>
          </div>
        </template>
      </Card>
    </div>
    <card>
      <template #content>
        <!-- progress bar -->
        <div>
          <Button severity="success" @click="goToRecap">
            {{ t('next') }}
          </Button>
        </div>
      </template>
    </card>
  </div>
</template>

<script setup lang="ts">
import { useAreaStore } from '@/stores/area.store'
import { DataStorage } from '@/stores/contact/creates/dataStorage'
import { FieldsToIds } from '@/tools/area.utils'
import { fetchResource } from '@/tools/fetch.utils'
import { extremTrim, mostProbableValue } from '@/tools/string.utils'
import { Button, Card, Tag } from 'primevue'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const area = useAreaStore()
const { t } = useI18n()
const router = useRouter()

const fields = ref<Array<{ name: string; type: string }>>([])
const values = ref<{ [key: string]: string }[]>([])
const showField = ref<Array<{ name: string; type: string }>>([])
const errored = ref<boolean>(false)
const nbDuplicate = ref<number>()
const selectedField = ref<number>(0)
const duplicate = ref<
  Array<{
    //index of field
    index: number
    // index on server
    remoteIndex: number
    // object on server
    duplicateOf: { id: number; value: string; name: string }[]
    //resolved status
    status: 'auto-resolved' | 'resolved' | 'to-resolved'
  }>
>([])

const duplicateServerVal = computed(
  () => duplicate.value.find((d) => d.index == selectedField.value)?.duplicateOf,
)

// final merged values for the currently selected duplicate (keyed by field name)
const finalValues = ref<{ [key: string]: string }>({})

function initFinalValues() {
  finalValues.value = {}
  const serverList = duplicateServerVal.value ?? []
  serverList.forEach((s) => {
    const local = values.value[selectedField.value]?.[s.name]
    finalValues.value[s.name] = local !== undefined && local !== '' ? local : (s.value ?? '')
  })
}

function selectDuplicate(i: number) {
  selectedField.value = i
  initFinalValues()
}

function applyRowLocal(name: string) {
  const local = values.value[selectedField.value]?.[name]
  finalValues.value[name] = local ?? ''
}

function applyRowServer(name: string) {
  const server = (duplicateServerVal.value ?? []).find((d) => d.name === name)?.value
  finalValues.value[name] = server ?? ''
}

function applyAllLocal() {
  ;(duplicateServerVal.value ?? []).forEach((d) => {
    const local = values.value[selectedField.value]?.[d.name]
    if (local !== undefined && local !== '') finalValues.value[d.name] = local
  })
}

function applyAllServer() {
  ;(duplicateServerVal.value ?? []).forEach((d) => {
    if (d.value !== undefined && d.value !== '') finalValues.value[d.name] = d.value
  })
}

function saveAndNext() {
  const idx = selectedField.value
  const dup = duplicate.value[idx]
  if (!dup) return

  // apply merged values into duplicate.duplicateOf and local storage
  dup.duplicateOf = dup.duplicateOf.map((d) => ({
    ...d,
    value: finalValues.value[d.name] ?? d.value,
  }))
  // update local values as well
  values.value[idx] = { ...(values.value[idx] ?? {}), ...finalValues.value }
  dup.status = 'resolved'

  //find las valid id
  if (idx < duplicate.value.length - 1) {
    let nextIdx = idx + 1
    while (nextIdx < duplicate.value.length && !duplicate.value.find((d) => d.index == nextIdx))
      nextIdx++
    if (nextIdx < duplicate.value.length) {
      selectDuplicate(nextIdx)
    }
  }
}

function autoResovle() {
  duplicate.value = duplicate.value.map((dup) => {
    const server = dup.duplicateOf
    const local = server.map((s) => {
      // return { id: s.id, name: s.name, value: values.value[selectedField.value]?.[s.name] }
      const vlocal = values.value[dup.index]?.[s.name]
      if (!vlocal || !s.value) return vlocal ?? s.value ?? undefined
      if (extremTrim(vlocal) == extremTrim(s.value)) {
        return mostProbableValue(vlocal, s.value)
      } else return false
    })

    if (local.some((l) => l === false)) {
      //one or more is not saved by extremTrim
      return dup
    } else {
      return { ...dup, status: 'auto-resolved' }
    }
  })
}

function abortMerge() {
  initFinalValues()
}

onMounted(async () => {
  const types = DataStorage.getType()
  values.value = DataStorage.getValue()

  const fetch = await fetchResource(':area/contact/getDuplicate', {
    body: { data: FieldsToIds(values.value) },
  })

  nbDuplicate.value = fetch.nbDuplicate

  fields.value = types
  duplicate.value = fetch.duplicates.map((d) => {
    return { ...d, status: 'to-resolved' }
  })

  // initialize selection and final values
  if (duplicate.value.length > 0) {
    selectedField.value = 0
    initFinalValues()
  }

  autoResovle()
  showField.value = fields.value.filter((f) => area.primaryFields.some((s) => s.name === f.name))
})

const getSeverityFromStatus = (status: string) => {
  if (status == 'duplication.to-resolved') return 'warn'
  else if (status == 'duplication.resolved') return 'Success'
  else if (status == 'duplication.auto-resolved') return 'info'
  return 'warn'
}

function goToRecap() {
  //json stringify and parse for avoid proxy creation
  const exclude = new Set(duplicate.value.map((d) => d.index))
  DataStorage.setArray(
    JSON.parse(JSON.stringify(values.value.filter((_, index) => !exclude.has(index)))),
    DataStorage.getType(),
  )
  DataStorage.setEdit(
    duplicate.value.map((d) => {
      return {
        contactId: d.remoteIndex,
        data: d.duplicateOf,
      }
    }),
  )

  router.push({ name: '/user/contact/creates/recap' })
}
</script>
