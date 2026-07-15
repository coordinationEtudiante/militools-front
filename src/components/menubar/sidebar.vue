<script setup lang="ts">
import { computed } from 'vue'
import { Style, Avatar } from '@dicebear/core'
import lorelei from '@dicebear/styles/lorelei.json' with { type: 'json' }
import { useUserStore } from '@/stores/user.store'

const style = new Style(lorelei)
const userStore = useUserStore()

const avatarUrl = computed(() =>
  new Avatar(style, {
    seed: String(userStore.connected ? userStore.user.id : 0),
  }).toDataUri(),
)
</script>

<template>
  <div class="flex flex-col content-between border-surface rounded-xl">
    <div class="flex flex-col"></div>
    <div class="flex flex-col">
      <img
        style="width: 32px; height: 32px"
        :src="avatarUrl"
      />
    </div>
  </div>
</template>
