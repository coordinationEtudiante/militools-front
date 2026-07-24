<script setup lang="ts">
import { Button } from 'primevue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div
    class="relative m-auto flex flex-col gap-2 overflow-scroll rounded-3xl border border-red-300 bg-red-100 p-6 sm:p-10"
  >
    <h1
      class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance"
    >
      {{ t('no-server-route:title') }}
    </h1>
    <p class="mt-6 text-lg/8 text-gray-700">{{ t('no-server-route:subtitle') }}</p>

    <Button :link="false">
      <RouterLink to="/auth/login" class="w-full">
        {{ t('button.reconnect') }}
      </RouterLink>
    </Button>
  </div>
</template>
