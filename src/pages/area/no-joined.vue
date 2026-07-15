<script setup lang="ts">
import { Button } from 'primevue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div
    class="relative p-6 sm:p-10 border border-red-300 rounded-3xl flex flex-col gap-2 overflow-scroll bg-red-100 m-auto"
  >
    <h1
      class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance"
    >
      {{ t('area-no-joined') }}
    </h1>
    <p class="mt-6 text-lg/8 text-gray-700">{{ t('area-no-joined-subtitle') }}</p>

    <Button :link="false">
      <RouterLink to="/auth/login" class="w-full">
        {{ t('button.reconnect') }}
      </RouterLink>
    </Button>
  </div>
</template>
