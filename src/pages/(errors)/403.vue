<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const props = defineProps<{
  routes?: string
  permLevels?: string
  error?: string
}>()

const displayRoutes = props.routes ?? (route.query.routes as string | undefined)
const displayPermLevels = props.permLevels ?? (route.query.permLevels as string | undefined)
const displayError = props.error ?? (route.query.error as string | undefined)
</script>

<template>
  <div
    class="relative m-auto flex flex-col gap-2 overflow-scroll rounded-3xl border border-error/30 bg-error/10 p-6 sm:p-10"
  >
    <h1
      class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-highlighted sm:text-5xl lg:text-balance"
    >
      {{ t('perm-error:title') }}
    </h1>
    <p v-if="displayPermLevels" class="mt-6 text-lg/8 text-default">
      {{ t('perm-error:permLevels', { permLevels: displayPermLevels }) }}
    </p>
    <p v-else class="mt-6 text-lg/8 text-default">{{ t('perm-error:subtitle', { routes: displayRoutes }) }}</p>
    <p v-if="displayError" class="mt-6 text-lg/8 text-default">
      {{ t('perm-error:serverError', { error: displayError }) }}
    </p>
    <UButton variant="solid" color="error" disabled>
      {{ t('perm-error:ask') }}
    </UButton>
    <UButton variant="solid" color="error">
      <RouterLink to="/auth/login" class="w-full text-inverted">
        {{ t('button.reconnect') }}
      </RouterLink>
    </UButton>
  </div>
</template>
