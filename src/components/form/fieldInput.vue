<template>
  <IftaLabel>
    <InputText
      :id="String(field.id)"
      v-model="tryValue"
      :placeholder="field.type"
      :invalid="errored"
    />
    <label :for="String(field.id)">{{ field.name }}</label>
    <Message v-if="errored" size="small" severity="error" variant="simple">
      {{ t('type-error', { type: field.type, validator: validatorLabel }) }}
    </Message>
  </IftaLabel>
</template>

<script lang="ts" setup>
import { useAreaStore, type FieldsType } from '@/stores/area.store'
import { IftaLabel, InputText, Message } from 'primevue'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const { field, validation = true } = defineProps<{
  field: FieldsType
  validation?: boolean
}>()

const { t } = useI18n()
const areaStore = useAreaStore()

const validator = computed(() => areaStore.contactTypeValidator.get(field.type) ?? /.*/)
const validatorLabel = computed(() => validator.value.toString())

const tryValue = ref('')

const errored = computed(
  () => validation == true && tryValue.value !== '' && !validator.value.test(tryValue.value),
)

watch(
  tryValue,
  (newValue) => {
    if (!errored.value) {
      emit('update:modelValue', newValue)
    } else {
    }
  },
  { immediate: true },
)
</script>
