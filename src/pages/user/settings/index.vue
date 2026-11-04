<script setup lang="ts">
import { palettes, currentPalette } from '@/theme/palettes'
import { isDark } from '@/theme/useTheme'

const paletteOptions = Object.entries(palettes).map(([value, p]) => ({ label: p.label, value }))
</script>

<template>
  <main class="flex items-center justify-center">
    <section class="flex w-full max-w-md flex-col gap-6 rounded-xl border border-default bg-elevated p-6">
      <h1 class="text-2xl font-semibold tracking-tighter text-highlighted">Theme</h1>

      <div class="flex flex-col gap-4">
        <!-- Dark mode switch -->
        <div class="flex items-center justify-between">
          <span class="text-highlighted">Mode sombre</span>
          <USwitch v-model="isDark" />
        </div>

        <label class="flex flex-col gap-2">
          <!-- Select palette -->
          <span class="text-highlighted">Palette</span>
          <USelect 
            v-model="currentPalette" 
            :items="paletteOptions" 
            value-key="value" 
            label-key="label" 
          />
        </label>
      </div>
    </section>
  </main>
</template>