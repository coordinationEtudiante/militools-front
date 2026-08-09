<template>
  <InputText
    v-if="significance == 'other'"
    v-model="model"
    fluid
    :inputProps="{ autocomplete: true }"
    :invalid="errored"
    @keydown.enter="commit"
    @blur="commit"
  />
  <AutoComplete
    v-else
    v-model="model"
    fluid
    @complete="searchFieldValue"
    @option-select="onSelect"
    @keydown.enter="commit"
    @blur="commit"
    :suggestions="suggestions.map(formatSugestion)"
    :invalid="errored"
    v-tooltip="errored ? t('validation.explanation', { validator: validatorSource }) : false"
  />
</template>

<script setup lang="ts">
import { useAreaStore } from '@/stores/area.store'
import { fetchResource } from '@/tools/fetch.utils'
import { AutoComplete, InputText, type AutoCompleteOptionSelectEvent } from 'primevue'

import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  name: string
  type: string
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:providedField': [
    {
      field: number /*id:*/
      value: string /*value:*/
    }[],
  ]
  error: [isError: boolean]
  commit: []
}>()

const { t } = useI18n()
const area = useAreaStore()

const suggestions = ref<
  {
    output: string
    contactId: number
    primaryFields: {
      name: string
      value: string
    }[]
  }[]
>([])

const significance = computed(() => {
  const field = area.fields?.find((f) => f.name == props.name)
  if (!field) return 'other'
  else if (field.indexed) return 'indexed'
  else if (field.primary) return 'primary'
  else return 'other'
})

const model = computed({
  get: () => props.modelValue ?? '',
  set: (val: string) => {
    committed.value = false
    emit('update:modelValue', val)
  },
})

const committed = ref(false)

const validator = computed(() => area.contactTypeValidator?.get(props.type))
const validatorSource = computed(() => validator.value ?? /.*/)

const errored = computed(() => {
  if (!committed.value || model.value == '') return false

  return !validatorSource.value.test(model.value)
})

function commit() {
  committed.value = true
  emit('commit')
}

const formatSugestion = (sugestion: {
  output: string
  contactId: number
  primaryFields: {
    name: string
    value: string
  }[]
}) => {
  return `${sugestion.output} -> ${sugestion.primaryFields.map(({ name, value }) => `${name}: ${value}`).join(' ') ?? ' 🤷‍♂️ '}`
}

async function onSelect(event: AutoCompleteOptionSelectEvent) {
  const selectedOutput = event.value.split(' -> ').at(0) ?? ''
  emit('update:modelValue', selectedOutput)
  commit()

  if (significance.value === 'other') return
  //search contact with id of this search
  //search on sugestions
  const contactId = suggestions.value.find(
    (sugestion) => sugestion.output == event.value.split(' -> ').at(0),
  )?.contactId

  if (!contactId) return

  const contact = await fetchResource(':area/contact/getContactById', {
    query: { id: contactId, fields: '*' },
  })

  if (!contact) {
    return
  }

  emit(
    'update:providedField',
    contact.fields.map((field) => {
      return { field: field.id, value: field.value }
    }),
  )
}

async function searchFieldValue(event) {
  if (suggestions.value.findIndex((item) => item.output === event.query) !== -1) return

  if (event.query.length >= 2) {
    const fieldsProposal = await fetchResource(':area/contact/getAutocompleteFields', {
      query: { field: props.name, partial: event.query },
    })
    if (!fieldsProposal || fieldsProposal.proposals.length === 0) {
      suggestions.value = []
      return
    }

    suggestions.value = fieldsProposal.proposals
    return
  }

  suggestions.value = []
}
</script>
