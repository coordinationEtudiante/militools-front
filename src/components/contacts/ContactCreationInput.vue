<script setup lang="ts">
import { getAutocompleteFields } from '@/cloud-functions/contacts/getAutocompleteFields'
import { getContactById } from '@/cloud-functions/contacts/getContactById'
import { useAreaStore } from '@/stores/area.store'
import { AutoComplete, InputText, Message } from 'primevue'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface Suggestion {
  output: string
  contactId: number
  primaryFields: { name: string; value: string }[]
}

const props = defineProps<{
  id: number
  name: string
  type: string
  description?: string | null
  defaultValue?: string | null
  primary?: boolean
  indexed?: boolean
  significance: 'primary' | 'recomended' | 'other'
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  error: [hasError: boolean]
  'update:providedField': [fields: { field: number; value: string }[]]
}>()

const { t } = useI18n()
const area = useAreaStore()

const validator = computed(() => area.contactTypeValidator.get(props.type) ?? /.*/)
const sig = computed(() => props.significance)

const inputValue = ref<string | Suggestion>(props.modelValue ?? props.defaultValue ?? '')
const suggestions = ref<Suggestion[]>([])

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined && typeof inputValue.value === 'string' && inputValue.value !== val) {
      inputValue.value = val
    }
  },
)

let selecting = false

watch(inputValue, (val) => {
  if (typeof val === 'object' && val !== null) {
    handleSelect(val as Suggestion)
  } else if (typeof val === 'string' && !selecting) {
    emit('update:modelValue', val)
  }
})

const displayValue = computed({
  get: () =>
    (typeof inputValue.value === 'object'
      ? (inputValue.value as Suggestion).output
      : inputValue.value) as string,
  set: (val: string) => {
    inputValue.value = val
  },
})

const errored = computed(() => {
  if (!displayValue.value) return false
  return !validator.value.test(displayValue.value.trim())
})

watch(errored, (val) => emit('error', val), { immediate: true })

async function searchFieldValue(event: { query: string }) {
  if (event.query.length < 2) {
    suggestions.value = []
    return
  }

  const result = getAutocompleteFields({ field: String(props.id), partial: event.query })
  await result.doFetch()

  suggestions.value = result.data.value?.proposals ?? []
}

async function handleSelect(selected: Suggestion) {
  selecting = true
  inputValue.value = selected.output

  emit('update:modelValue', selected.output)

  if (sig.value === 'other') {
    selecting = false
    return
  }

  const result = getContactById({ id: String(selected.contactId), fields: '*' })
  await result.doFetch()

  const contact = result.data.value
  if (!contact) {
    selecting = false
    return
  }

  emit(
    'update:providedField',
    contact.fields.map((f) => ({ field: f.id, value: f.value })),
  )
  selecting = false
}
</script>

<template>
  <div class="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
    <div class="flex flex-1 flex-col gap-1">
      <div class="mb-1 flex items-center gap-2">
        <span class="text-sm font-medium text-gray-700">{{ name }}</span>
        <i
          v-if="sig === 'primary'"
          class="pi pi-id-card text-xs text-gray-400"
          v-tooltip="t('primary.description')"
        />
        <i
          v-else-if="sig === 'recomended'"
          class="pi pi-bolt text-xs text-gray-400"
          v-tooltip="t('recomended.description')"
        />
        <i v-else class="pi pi-tag text-xs text-gray-400" v-tooltip="t('other.description')" />
      </div>

      <InputText
        v-if="sig === 'other'"
        :id="String(id)"
        v-model="displayValue"
        :invalid="errored"
        fluid
      />

      <AutoComplete
        v-else
        v-model="inputValue"
        :inputId="String(id)"
        :suggestions="suggestions"
        optionLabel="output"
        @complete="searchFieldValue"
        :invalid="errored"
        fluid
      >
        <template #option="slotProps">
          <div class="flex flex-col gap-1 text-sm">
            <span class="font-medium">{{ slotProps.option.output }}</span>
            <span
              v-if="significance !== 'primary' && slotProps.option.primaryFields?.length"
              class="text-xs text-gray-500"
            >
              {{
                slotProps.option.primaryFields
                  .map((p: { name: string; value: string }) => `${p.name}: ${p.value}`)
                  .join(' · ')
              }}
            </span>
            <!-- <span
              v-else-if="significance !== 'recomended' && slotProps.option.recomended?.length"
              class="text-xs text-gray-500"
            >
              {{
                slotProps.option.recomended
                  .map((p: { name: string; value: string }) => `${p.name}: ${p.value}`)
                  .join(' · ')
              }}
            </span> -->
          </div>
        </template>
      </AutoComplete>

      <Message v-if="errored" severity="error" size="small" variant="simple">
        {{ t('validation.error') }}
      </Message>
    </div>

    <i
      v-if="description"
      class="pi pi-question-circle mt-2 cursor-help text-gray-400"
      v-tooltip="description"
    />
  </div>
</template>
