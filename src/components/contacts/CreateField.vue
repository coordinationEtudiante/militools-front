<script setup lang="ts">
import { createContactFields } from '@/cloud-functions/contacts/createContactFields'
import { useAreaStore } from '@/stores/area.store'
import { AutoComplete, Button, Dialog, InputText, Message, RadioButton } from 'primevue'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const area = useAreaStore()

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const localVisible = ref(false)

watch(
  () => props.visible,
  (newVal) => {
    if (newVal) reset()
    localVisible.value = newVal
  },
  { immediate: true },
)

watch(localVisible, (newVal) => emit('update:visible', newVal))

const fieldName = ref('')
const fieldDescription = ref('')
const typeValue = ref('')
const fieldDefaultValue = ref('')
const significance = ref('')
const suggestions = ref<string[]>([])
const errorMessage = ref('')

function reset() {
  fieldName.value = ''
  fieldDescription.value = ''
  typeValue.value = ''
  fieldDefaultValue.value = ''
  significance.value = ''
  errorMessage.value = ''
}

const validTypes = computed(() => area.validator.map(([type]) => type))

const nameValid = computed(() => {
  if (!fieldName.value) return true
  return !area.fields.some((f) => f.name.toLowerCase() === fieldName.value.toLowerCase())
})

const typeValid = computed(() => {
  if (!typeValue.value) return true
  return validTypes.value.includes(typeValue.value)
})

const defaultValid = computed(() => {
  if (!fieldDefaultValue.value) return true
  const validator = area.contactTypeValidator.get(typeValue.value) ?? /.*/
  return fieldDefaultValue.value !== '' ? validator.test(fieldDefaultValue.value) : true
})

function search(event: { query: string }) {
  const query = event.query.toLowerCase()
  suggestions.value = area.validator
    .filter((type) => type[0].toLowerCase().includes(query))
    .map((e) => e[0])
}

async function handleSubmit() {
  if (!defaultValid.value || !typeValid.value || !nameValid.value) return

  try {
    const result = createContactFields({
      name: fieldName.value,
      description: fieldDescription.value,
      type: typeValue.value,
      significance: significance.value as 'primary' | 'indexed' | 'other',
      defaultValue: fieldDefaultValue.value || undefined,
    }, false)
    await result.doFetch()

    if (result.errorCode.value && result.errorCode.value !== 200) {
      errorMessage.value = result.data.value?.message ?? t('error.unexpected')
      return
    }

    reset()
    await area.hydrate(true)
    localVisible.value = false
  } catch {
    errorMessage.value = t('error.unexpected')
  }
}
</script>

<template>
  <Dialog
    v-model:visible="localVisible"
    modal
    :header="t('modal.creat-field.header')"
    :style="{ width: '25rem' }"
  >
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <span>{{ t('modal.creat-field.title') }}</span>

      <div class="flex flex-col gap-1">
        <label for="fieldName">{{ t('modal.creat-field.new-field-name') }}</label>
        <InputText
          id="fieldName"
          v-model="fieldName"
          required
          fluid
          :invalid="!nameValid && fieldName.length > 0"
        />
      </div>

      <Message
        v-if="!nameValid && fieldName.length > 0"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ t('modal.creat-field.duplicate-name') }}
      </Message>

      <div class="flex flex-col gap-1">
        <label for="fieldDescription">{{ t('modal.creat-field.new-field-description') }}</label>
        <InputText id="fieldDescription" v-model="fieldDescription" required fluid />
      </div>

      <div class="flex flex-col gap-1">
        <label for="fieldType">{{ t('modal.creat-field.new-field-type') }}</label>
        <AutoComplete
          v-model="typeValue"
          :suggestions="suggestions"
          @complete="search"
          dropdown
          fluid
          :invalid="!typeValid && typeValue.length > 0"
        />
      </div>

      <Message
        v-if="!typeValid && typeValue.length > 0"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ t('modal.creat-field.invalid-type') }}
      </Message>

      <div class="flex flex-col gap-1">
        <label for="fieldDefaultValue">{{ t('modal.creat-field.new-field-default-value') }}</label>
        <InputText
          id="fieldDefaultValue"
          v-model="fieldDefaultValue"
          :invalid="!defaultValid && fieldDefaultValue.length > 0"
          fluid
        />
      </div>

      <Message
        v-if="!defaultValid && fieldDefaultValue.length > 0"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ t('modal.creat-field.default-type-error') }}
      </Message>

      <div class="flex items-center gap-2">
        <RadioButton
          v-model="significance"
          inputId="fieldPrimary"
          name="significance"
          value="primary"
        />
        <label for="fieldPrimary">{{ t('primary.description') }}</label>
      </div>

      <div class="flex items-center gap-2">
        <RadioButton
          v-model="significance"
          inputId="fieldIndexed"
          name="significance"
          value="indexed"
        />
        <label for="fieldIndexed">{{ t('recomended.description') }}</label>
      </div>

      <div class="flex items-center gap-2">
        <RadioButton
          v-model="significance"
          inputId="fieldOther"
          name="significance"
          value="other"
        />
        <label for="fieldOther">{{ t('other.description') }}</label>
      </div>

      <div class="flex gap-2">
        <Button type="submit" :label="t('create-field')" />
        <Button :label="t('button.give-up')" severity="contrast" @click="localVisible = false" />
      </div>

      <Message v-if="errorMessage" severity="error" size="small">
        {{ errorMessage }}
      </Message>
    </form>
  </Dialog>
</template>
