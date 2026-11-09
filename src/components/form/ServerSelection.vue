<template>
  <div
    class="server-selection flex flex-col gap-1"
    :class="{
      'rounded-md border border-default p-1':
        serverSelection === t('custom-server') || helperVisible,
    }"
  >
    <UAlert v-if="helperVisible" color="info">
      {{ t('server-selection.helper') }}
    </UAlert>
    <div class="flex gap-2">
      <USelect
        v-model="serverSelection"
        :items="serverOptions"
        :placeholder="t('server-selection.placeholder')"
        :disabled="disabled"
        class="flex-1"
      />
      <UButton color="info" variant="solid" @click="toggle" :disabled="disabled">
        <Info class="h-4 w-4" />
      </UButton>
    </div>
    <UFormField v-if="serverSelection === t('custom-server')" :label="t('input.custom-server')">
      <UInput
        id="custom-server"
        v-model="customServer"
        :placeholder="t('custom-server.placeholder')"
        :invalid="customServerError"
        :disabled="disabled"
        fluid
      >
        <template #leading>
          <Cloud class="h-4 w-4" />
        </template>
      </UInput>
    </UFormField>

    <UAlert v-if="customServerError" color="error">
      {{ t('custom-server.error-format') }}
    </UAlert>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Cloud, Info } from '@lucide/vue'
import { useServerStore } from '@/stores/server.store'

const { t } = useI18n()
const serverStore = useServerStore()

defineProps<{ disabled?: boolean }>()

const urlPattern =
  /^(https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?)|(http:\/\/\d{1,3}(\.\d{1,3}){3}:\d{1,5}(\/.*)?)$/

const helperVisible = ref(false)
const serverOptions: string[] = [serverStore.defaultServer, t('custom-server')]
const serverSelection = ref(
  serverStore.selectedServer === serverStore.defaultServer
    ? serverStore.defaultServer
    : t('custom-server'),
)
const customServer = ref(
  serverStore.selectedServer === serverStore.defaultServer ? '' : serverStore.selectedServer,
)

if (import.meta.env.MODE === 'development') {
  serverOptions[0] = 'http://127.0.0.1:8080/'
}

const toggle = () => {
  helperVisible.value = !helperVisible.value
}

const finalValue = computed(() => {
  if (serverSelection.value === t('custom-server')) {
    if (customServer.value !== '' && urlPattern.test(customServer.value)) {
      return customServer.value
    }
    return null
  }
  return serverSelection.value || serverOptions[0]!
})

const customServerError = computed(() => {
  if (serverSelection.value !== t('custom-server')) {
    return false
  }

  return customServer.value !== '' && !urlPattern.test(customServer.value)
})

watch(
  [serverSelection, customServer],
  () => {
    if (finalValue.value) {
      serverStore.setServer(finalValue.value)
    }
  },
  { immediate: true },
)
</script>

<style lang="postcss" scoped>
.server-selection {
  &.active {
    padding: var(--gap);
    max-width: 100%;
    border-radius: var(--p-inputtext-border-radius);
    border: 1px solid var(--p-inputtext-border-color);
  }

  .server-selection-helper {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }
}
</style>
