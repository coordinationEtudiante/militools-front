<script setup lang="ts">
import { computed } from 'vue'
import { Style, Avatar, type StyleOptions } from '@dicebear/core'
import definition from '@dicebear/styles/adventurer.json' with { type: 'json' }

const {
  seed,
  size = 128,
  style,
  option,
} = defineProps<{ seed: string; size: number; style?: Style; option?: StyleOptions }>()

const avatarStyle = style ?? new Style(definition)

const avatar = computed(() =>
  new Avatar(avatarStyle, {
    seed: seed,
    size,
    ...option,
  }).toDataUri(),
)
</script>

<template>
  <img :width="size" :height="size" :src="avatar" alt="Avatar" />
</template>
