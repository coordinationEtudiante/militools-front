<template>
  <div
    class="server-selection flex flex-col gap-1"
    :class="{
      'p-1 border border-gray-300 rounded-md': serverSelection === t('custom-server') || helperVisible,
    }"
  >
    <Message v-if="helperVisible" severity="info">
      {{ t('server-selection.helper') }}
    </Message>
    <InputGroup>
      <Select
        v-model="serverSelection"
        :options="serverOptions"
        placeholder="Serveur par défaut"
        :disabled="disabled"
        fluid
      />
      <InputGroupAddon>
        <Button severity="info" @click="toggle" :disabled="disabled">
          <Info class="h-4 w-4" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
    <FloatLabel variant="on" v-if="serverSelection === t('custom-server')">
      <IconField>
        <InputIcon>
          <Cloud class="h-4 w-4" />
        </InputIcon>
        <InputText
          v-model="customServer"
          :placeholder="t('custom-server.placeholder')"
          :invalid="customServerError"
          id="custom-server"
          fluid
          :disabled="disabled"
        />
      </IconField>
      <label for="custom-server">{{ t('input.custom-server') }}</label>
    </FloatLabel>

    <Message v-if="customServerError" severity="error">
      {{ t('custom-server.error-format') }}
    </Message>
  </div>
</template>

<script setup lang="ts">
import {
  FloatLabel,
  IconField,
  InputGroup,
  InputGroupAddon,
  InputIcon,
  InputText,
  Message,
  Select,
} from 'primevue'
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
