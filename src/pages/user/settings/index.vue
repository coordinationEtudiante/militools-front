<script setup lang="ts">
import { Select, ToggleSwitch } from 'primevue'
import { palettes, currentPalette } from '@/theme/palettes'
import { isDark } from '@/theme/useTheme'

const paletteOptions = Object.entries(palettes).map(([value, p]) => ({ label: p.label, value }))
</script>

<template>
  <main class="flex items-center justify-center">
    <section class="flex w-full max-w-md flex-col gap-6 rounded-xl border border-gray-300 bg-white p-6">
      <h1 class="text-2xl font-semibold tracking-tighter text-gray-950">Theme</h1>

      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <span class="text-gray-950">Mode sombre</span>
          <ToggleSwitch v-model="isDark" />
        </div>

        <label class="flex flex-col gap-2">
          <span class="text-gray-950">Palette</span>
          <Select v-model="currentPalette" :options="paletteOptions" optionLabel="label" optionValue="value" />
        </label>
      </div>
    </section>
  </main>
</template>