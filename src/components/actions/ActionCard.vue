<template>
  <MCard>
    <template #title>
      <RouterLink :to="{ name: '/user/action/[id]', params: { id: action.id } }">
        {{ action.title }}
      </RouterLink>
    </template>
    <template #subtitle>
      <Tag severity="secondary" icon="pi pi-map-marker">{{ action.locationName }}</Tag>
      <Tag severity="secondary" icon="pi pi pi-megaphone">{{ area?.name ?? action.area }}</Tag>
    </template>
    <template #default>{{ action.description }}</template>
    <template #footer>
      <ActionButton :action-id="action.id" />
    </template>
  </MCard>
</template>

<script setup lang="ts">
import type { Action } from '@/stores/action.store'
import MCard from '../MCard.vue'
import { useAreaStore } from '@/stores/area.store'
import { computed } from 'vue'

const { action } = defineProps<{
  action: Action
}>()

const { getArea } = useAreaStore()
const area = computed(() => getArea())
</script>
