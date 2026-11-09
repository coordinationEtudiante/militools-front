<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div
    class="relative m-auto flex flex-col gap-2 overflow-scroll rounded-3xl border border-error/30 bg-error/10 p-6 sm:p-10"
  >
    <h1
      class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-highlighted sm:text-5xl lg:text-balance"
    >
      {{ t('no-server-route:title') }}
    </h1>
    <p class="mt-6 text-lg/8 text-default">{{ t('no-server-route:subtitle') }}</p>

    <UButton variant="solid" color="error">
      <RouterLink to="/auth/login" class="w-full text-inverted">
        {{ t('button.reconnect') }}
      </RouterLink>
    </UButton>
  </div>
</template>
