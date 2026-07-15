<script setup lang="ts">
import { KeyRound } from '@lucide/vue'
import { FloatLabel, IconField, InputIcon, InputPassword } from 'primevue'
import { useI18n } from 'vue-i18n'

const password = defineModel<string>('password', { required: true })
defineProps<{ disabled: boolean; invalid: boolean }>()

const { t } = useI18n()
</script>

<template>
  <FloatLabel variant="on">
    <IconField>
      <InputIcon>
        <KeyRound :size="15" />
      </InputIcon>
      <InputPassword v-model="password" :feedback="false" toggleMask fluid :disabled :invalid />
    </IconField>
    <label for="phone">{{ t('input.password') }}</label>
  </FloatLabel>
</template>
