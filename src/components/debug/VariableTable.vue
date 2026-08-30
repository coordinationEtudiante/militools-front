<script setup lang="ts">
import { Column, DataTable, Message } from 'primevue'
import { useI18n } from 'vue-i18n'
import { serializeValue } from '@/tools/debug.utils'

defineProps<{
  // Key/value rows to display (state or getters of a store)
  rows: Array<{ key: string; value: unknown }>
  emptyMessage?: string
}>()

const { t } = useI18n()

// Key names considered sensitive: their value is masked on display
const SENSITIVE_KEY = /token|password|passwd|secret|authorization|api[-_]?key/i

function isSensitive(key: string) {
  return SENSITIVE_KEY.test(key)
}
</script>

<template>
  <!-- No variable: neutral message instead of an empty table -->
  <Message v-if="rows.length === 0" severity="secondary" :sticky="true" class="w-full">
    {{ emptyMessage ?? t('debug.empty') }}
  </Message>
  <DataTable v-else :value="rows" size="small" striped-rows scrollable scroll-height="26rem">
    <Column field="key" :header="t('debug.column.key')" class="w-56">
      <template #body="{ data }">
        <code class="text-xs font-medium text-gray-800">{{ data.key }}</code>
      </template>
    </Column>
    <Column field="value" :header="t('debug.column.value')">
      <template #body="{ data }">
        <!-- Value serialized as JSON (bounded); secrets are masked -->
        <pre
          class="m-0 max-h-40 overflow-auto rounded-md bg-gray-50 p-2 font-mono text-[11px] leading-relaxed break-all whitespace-pre-wrap text-gray-800"
          >{{ isSensitive(data.key) ? '••••••••' : serializeValue(data.value) }}</pre
        >
      </template>
    </Column>
  </DataTable>
</template>
