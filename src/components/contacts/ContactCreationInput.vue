<script setup lang="ts">
import { getAutocompleteFields } from '@/cloud-functions/contacts/getAutocompleteFields'
import { getContactById } from '@/cloud-functions/contacts/getContactById'
import InputPhone, { type PhoneSuggestion } from '@/components/form/inputPhone.vue'
import { useAreaStore } from '@/stores/area.store'
import { extractEnumOptions } from '@/tools/contactValidation.utils'
import { clearPhone } from '@/tools/phone.utils'
import { Lock, Unlock } from '@lucide/vue'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface Suggestion {
  output: string
  contactId: number
  primaryFields: { name: string; value: string }[]
}

const props = withDefaults(
  defineProps<{
    id: number
    name: string
    type: string
    description?: string | null
    defaultValue?: string | null
    primary?: boolean
    indexed?: boolean
    significance: 'primary' | 'recomended' | 'other'
    modelValue?: string
    frozen?: boolean
    showLock?: boolean
  }>(),
  { frozen: false, showLock: false },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  error: [hasError: boolean]
  'update:providedField': [fields: { field: number; value: string }[]]
  autofilledContact: [contactId: number]
  'update:frozen': [value: boolean]
}>()

function toggleFrozen() {
  emit('update:frozen', !props.frozen)
}

const { t } = useI18n()
const area = useAreaStore()

const validator = computed(() => area.contactTypeValidator.get(props.type) ?? /.*/)
const sig = computed(() => props.significance)

const inputAttrs = computed(() => {
  const base = { disabled: props.frozen }
  if (props.type == 'email') return { ...base, type: 'email' as const, inputmode: 'email' as const }
  if (props.type == 'integer') return { ...base, type: 'text' as const, inputmode: 'numeric' as const }
  if (props.type == 'number') return { ...base, type: 'text' as const, inputmode: 'decimal' as const }
  return { ...base, type: 'text' as const }
})

const inputValue = ref<string | Suggestion>(props.modelValue ?? props.defaultValue ?? '')
const booleanValue = computed({
  get: () => ['true', '1'].includes(String(inputValue.value)),
  set: (checked: boolean) => {
    inputValue.value = checked ? 'true' : 'false'
  },
})
const phoneValue = computed({
  get: () => String(inputValue.value ?? ''),
  set: (value: string) => {
    inputValue.value = value
  },
})

function toggleBoolean() {
  booleanValue.value = !booleanValue.value
}
const suggestions = ref<Suggestion[]>([])
const isEnum = computed(() => props.type.startsWith('enum'))
const enumOptions = computed(() => extractEnumOptions(props.type, validator.value))
const enumSuggestions = ref<string[]>([])

watch(
  enumOptions,
  (options) => {
    enumSuggestions.value = [...options]
  },
  { immediate: true },
)

function searchEnum(event: { query: string }) {
  const query = event.query.trim().toLowerCase()
  enumSuggestions.value = enumOptions.value.filter((option) => option.toLowerCase().includes(query))
}

function primaryDetail(option: Suggestion): { name: string; value: string } | null {
  return option.primaryFields?.find((field) => field.name !== props.name) ?? null
}

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

// Trigger autofill when a suggestion is selected from the menu.
watch(displayValue, (val) => {
  if (selecting || typeof val !== 'string') return
  const selected = suggestions.value.find((s) => s.output === val)
  if (selected) {
    void handleSelect(selected)
  }
})

const errored = computed(() => {
  if (!displayValue.value) return false
  const value = props.type == 'phone' ? clearPhone(displayValue.value) : displayValue.value
  return !validator.value.test(value.trim())
})

watch(errored, (val) => emit('error', val), { immediate: true })

function normalizePhone() {
  if (props.type !== 'phone' || typeof inputValue.value !== 'string') return
  const normalized = clearPhone(inputValue.value)
  if (normalized !== inputValue.value) {
    inputValue.value = normalized
  }
}

async function searchSuggestions(query: string) {
  if (selecting) return
  if (query.length < 2) {
    suggestions.value = []
    return
  }

  const result = getAutocompleteFields({ field: String(props.id), partial: query })
  await result.doFetch()

  suggestions.value = result.data.value?.proposals ?? []
}

async function searchFieldValue(event: { query: string }) {
  if (selecting) return
  await searchSuggestions(event.query)
}

const phoneSuggestions = computed<PhoneSuggestion[] | undefined>(() => {
  if (props.type !== 'phone') return undefined
  return suggestions.value.map((suggestion) => {
    const detail = primaryDetail(suggestion)
    return {
      value: suggestion.output,
      detail: detail ? `${detail.name}: ${detail.value}` : undefined,
    }
  })
})

function handlePhoneSelect(value: string) {
  const suggestion =
    suggestions.value.find((s) => s.output === value) ??
    suggestions.value.find((s) => clearPhone(s.output) === clearPhone(value))
  if (suggestion) {
    void handleSelect(suggestion)
  }
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
  emit('autofilledContact', selected.contactId)
  selecting = false
}
</script>

<template>
  <div class="flex items-start gap-3 rounded-lg border border-default bg-elevated p-3">
    <div class="flex flex-1 flex-col gap-1">
      <div class="mb-1 flex items-center gap-2">
        <span class="text-sm font-medium text-default">{{ name }}</span>
        <UTooltip v-if="sig === 'primary'" :text="t('primary.description')">
          <i class="pi pi-id-card text-xs text-muted" />
        </UTooltip>
        <UTooltip v-else-if="sig === 'recomended'" :text="t('recomended.description')">
          <i class="pi pi-bolt text-xs text-muted" />
        </UTooltip>
        <UTooltip v-else :text="t('other.description')">
          <i class="pi pi-tag text-xs text-muted" />
        </UTooltip>
      </div>

      <div
        v-if="props.type == 'boolean'"
        role="switch"
        :aria-checked="booleanValue"
        :aria-label="name"
        :tabindex="frozen ? -1 : 0"
        class="flex w-fit cursor-pointer items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-(--primary-color)"
        @keydown.space.prevent="toggleBoolean"
        @keydown.enter.prevent="toggleBoolean"
      >
        <USwitch
          v-model="booleanValue"
          :disabled="frozen"
        />
      </div>

      <UInputMenu
        v-else-if="isEnum"
        v-model="displayValue"
        :items="enumSuggestions"
        :disabled="frozen"
        :color="errored ? 'error' : 'primary'"
        :tabindex="frozen ? -1 : undefined"
        class="w-full"
        @update:search-term="searchEnum({ query: $event })"
      />

      <InputPhone
        v-else-if="props.type == 'phone'"
        v-model:phone="phoneValue"
        :disabled="false"
        :invalid="errored"
        :suggestions="phoneSuggestions"
        :tabindex="frozen ? -1 : undefined"
        @select="handlePhoneSelect"
        @search="searchSuggestions"
      />

      <UInput
        v-else-if="sig === 'other'"
        :id="String(id)"
        v-model="displayValue"
        :invalid="errored"
        v-bind="inputAttrs"
        fluid
      />

      <UInputMenu
        v-else
        v-model="displayValue"
        :items="suggestions"
        value-key="output"
        label-key="output"
        :color="errored ? 'error' : 'primary'"
        v-bind="inputAttrs"
        :tabindex="frozen ? -1 : undefined"
        class="w-full"
        @update:search-term="searchFieldValue({ query: $event })"
        @blur="normalizePhone"
      >
        <template #item="{ item }">
          <div class="flex flex-col gap-1 text-sm">
            <span class="font-medium">{{ item.output }}</span>
            <span v-if="sig !== 'primary' && item.primaryFields?.length" class="text-xs text-muted">
              {{ item.primaryFields.map((p: { name: string; value: string }) => `${p.name}: ${p.value}`).join(' · ') }}
            </span>
            <span v-else-if="sig === 'primary' && primaryDetail(item)" class="text-xs text-muted">
              {{ `${primaryDetail(item)!.name}: ${primaryDetail(item)!.value}` }}
            </span>
          </div>
        </template>
      </UInputMenu>

      <UAlert v-if="errored" color="error" size="xs">
        {{ t('validation.error') }}
      </UAlert>
    </div>

    <div v-if="description || showLock" class="mt-2 flex items-center gap-1">
      <UTooltip v-if="description" :text="description">
        <i class="pi pi-question-circle cursor-help text-muted" />
      </UTooltip>
      <button
        v-if="showLock"
        type="button"
        class="cursor-pointer rounded p-0.5 text-muted transition-colors hover:text-default"
        :class="{ 'text-amber-500 hover:text-amber-600': frozen }"
        :title="frozen ? t('field.unfreeze') : t('field.freeze')"
        @click="toggleFrozen"
      >
        <Lock v-if="frozen" :size="14" />
        <Unlock v-else :size="14" />
      </button>
    </div>
  </div>
</template>
