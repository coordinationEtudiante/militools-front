<script setup lang="ts">
import type { MergeField } from '@/types/merge.type'
import { Check } from '@lucide/vue'
import { Button, InputText } from 'primevue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  field: MergeField
}>()

const emit = defineEmits<{
  'apply-local': []
  'apply-server': []
  'update:final': [value: string]
}>()

const { t } = useI18n()

const finalState = computed(() => {
  const { local, server, final } = props.field
  if (local && server && local === server) return 'same'
  if (final === local || final === server) return 'default'
  return 'custom'
})

const finalClass = computed(() => {
  if (finalState.value === 'same') return 'bg-emerald-50'
  if (finalState.value === 'custom') return 'bg-amber-50'
  return ''
})
</script>

<template>
  <!-- mobile -->
  <div class="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-3 md:hidden">
    <div class="flex items-center justify-between gap-2">
      <span class="truncate text-sm font-semibold text-gray-700">{{ field.name }}</span>
      <Check v-if="field.autoResolved" class="h-4 w-4 shrink-0 text-emerald-500" />
    </div>

    <div class="flex items-center justify-between gap-2">
      <span class="text-xs text-gray-400">{{ t('local-version') }}</span>
      <span class="min-w-0 flex-1 truncate text-sm text-gray-700">{{ field.local || '—' }}</span>
      <Button
        variant="text"
        severity="info"
        size="small"
        icon="pi pi-angle-double-right"
        v-tooltip="t('merge.use-local')"
        :disabled="!field.local || field.final === field.local"
        @click="emit('apply-local')"
      />
    </div>

    <div class="flex items-center gap-2">
      <span class="w-12 shrink-0 text-xs text-gray-400">{{ t('final-version') }}</span>
      <InputText
        :modelValue="field.final"
        fluid
        class="text-sm"
        :class="finalClass"
        @update:modelValue="(value) => emit('update:final', value ?? '')"
      />
    </div>

    <div class="flex items-center justify-between gap-2">
      <span class="text-xs text-gray-400">{{ t('server-version') }}</span>
      <span class="min-w-0 flex-1 truncate text-sm text-gray-700">{{ field.server || '—' }}</span>
      <Button
        variant="text"
        severity="info"
        size="small"
        icon="pi pi-angle-double-left"
        v-tooltip="t('merge.use-server')"
        :disabled="!field.server || field.final === field.server"
        @click="emit('apply-server')"
      />
    </div>
  </div>

  <!-- desktop -->
  <div
    class="hidden border border-gray-200 bg-white px-3 py-2 md:grid md:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_2.5rem_minmax(0,1fr)_2.5rem_minmax(0,1fr)] md:items-center md:gap-0 md:rounded-none md:border-x-0 md:border-t-0 md:border-b"
  >
    <div class="flex items-center gap-1.5 md:pr-2">
      <span class="truncate text-sm font-medium text-gray-700">{{ field.name }}</span>
      <Check v-if="field.autoResolved" class="h-3.5 w-3.5 shrink-0 text-emerald-500" />
    </div>

    <div class="md:pr-2">
      <span class="text-sm break-all text-gray-700">{{ field.local || '—' }}</span>
    </div>

    <div class="flex justify-center">
      <Button
        variant="text"
        severity="info"
        size="small"
        icon="pi pi-angle-double-right"
        v-tooltip="t('merge.use-local')"
        :disabled="!field.local || field.final === field.local"
        @click="emit('apply-local')"
      />
    </div>

    <div>
      <InputText
        :modelValue="field.final"
        fluid
        class="text-sm"
        :class="finalClass"
        @update:modelValue="(value) => emit('update:final', value ?? '')"
      />
    </div>

    <div class="flex justify-center">
      <Button
        variant="text"
        severity="info"
        size="small"
        icon="pi pi-angle-double-left"
        v-tooltip="t('merge.use-server')"
        :disabled="!field.server || field.final === field.server"
        @click="emit('apply-server')"
      />
    </div>

    <div class="md:pl-2">
      <span class="text-sm break-all text-gray-700">{{ field.server || '—' }}</span>
    </div>
  </div>
</template>
