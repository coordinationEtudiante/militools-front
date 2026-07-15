<script setup lang="ts">
import { Phone } from '@lucide/vue'
import { FloatLabel, IconField, InputIcon, InputText } from 'primevue'
import { useI18n } from 'vue-i18n'

const phone = defineModel<string>('phone', { required: true })
defineProps<{ disabled: boolean; invalid: boolean }>()

const { t } = useI18n()
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
        v-mask="'09 99 99 99 99'"
        inputmode="numeric"
        :disabled
        :invalid
        fluid
      />
    </IconField>
    <label for="phone">{{ t('input.phone') }}</label>
  </FloatLabel>
</template>
