<script setup lang="ts">
import type { BgColor } from '@/types/tailwindColor'

defineProps<{
  title?: string
  subtitle?: string
  loading?: boolean
  bgColor?: BgColor
  errorMessage?: string
}>()

defineSlots<{
  header?()
  footer?()
  default()
  error?()
}>()
</script>

<template>
  <section
    :class="bgColor ?? 'bg-white'"
    class="flex flex-col gap-2 overflow-scroll rounded-xl border border-gray-300 p-4"
  >
    <template v-if="!errorMessage">
      <slot name="header">
        <header v-if="title || subtitle" class="mb-2 tracking-tighter text-balance text-gray-950">
          <div class="text-2xl" v-if="title">
            {{ title }}
          </div>
          <div class="text-xl" v-if="subtitle">
            {{ subtitle }}
          </div>
        </header>
      </slot>
      <div class="flex-1" v-bind="$attrs">
        <slot />
      </div>
      <footer>
        <slot name="footer" />
      </footer>
    </template>
    <template v-else>
      <slot name="error">{{ errorMessage }}</slot>
    </template>
  </section>
</template>
