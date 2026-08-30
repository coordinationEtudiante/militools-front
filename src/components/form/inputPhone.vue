<script setup lang="ts">
import { Phone } from '@lucide/vue'
import { FloatLabel, IconField, InputIcon, InputText } from 'primevue'
import { useI18n } from 'vue-i18n'
import { clearPhone } from '@/tools/phone.utils'

const phone = defineModel<string>('phone', { required: true })
defineProps<{ disabled: boolean; invalid: boolean }>()

const { t } = useI18n()

function normalize() {
  const current = phone.value
  if (current) {
    const normalized = clearPhone(current)
    if (normalized !== current) {
      phone.value = normalized
    }
  }
}
</script>

<template>
  <FloatLabel variant="on">
    <IconField>
      <InputIcon>
        <Phone :size="15" />
      </InputIcon>
      <InputText
        type="tel"
        v-model="phone"
        inputmode="numeric"
        :disabled
        :invalid
        fluid
        @blur="normalize"
      />
    </IconField>
    <label for="phone">{{ t('input.phone') }}</label>
  </FloatLabel>
</template>
