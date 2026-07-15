<script setup lang="ts">
import { computed } from 'vue'
import { Style, Avatar } from '@dicebear/core'
import definition from '@dicebear/styles/adventurer.json' with { type: 'json' }

const { seed, size = 128 } = defineProps<{ seed: string; size: number }>()

const style = new Style(definition)

const avatar = computed(() =>
  new Avatar(style, {
    seed: seed,
    size,
  }).toDataUri(),
)
</script>

<template>
  <img :src="avatar" alt="Avatar" />
</template>
