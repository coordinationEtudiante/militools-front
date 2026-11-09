<script setup lang="ts">
import { KeyRound } from '@lucide/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const password = defineModel<string>('password', { required: true })
defineProps<{ disabled: boolean; invalid: boolean }>()

const { t } = useI18n()

const show = ref(false)
</script>

<template>
  <UFormField :label="t('input.password')">
    <UInput
      v-model="password"
      :type="show ? 'text' : 'password'"
      :disabled="disabled"
      :invalid="invalid"
      fluid
    >
      <template #leading>
        <KeyRound :size="16" />
      </template>
      <template #trailing>
        <UButton
          type="button"
          variant="ghost"
          color="neutral"
          class="p-0"
          :aria-label="show ? 'Masquer' : 'Afficher'"
          @click="show = !show"
        >
          <span v-if="show">🙈</span>
          <span v-else>👁</span>
        </UButton>
      </template>
    </UInput>
  </UFormField>
</template>
