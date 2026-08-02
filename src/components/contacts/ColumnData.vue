<template>
  <span class="column-data" v-if="value">
    <Chip v-if="type.type == 'number'">{{ value }}</Chip>
    <PhoneChip v-else-if="type.type == 'phone'" :phone="value" />
    <span v-else>{{ value }}</span>
  </span>
</template>

<script setup lang="ts">
import type { GetContactsResponse } from '@/types/cloud-functions/contacts/getContacts'
import { computed } from 'vue'

const { data, type } = defineProps<{
  data: GetContactsResponse['value'][number]
  type: GetContactsResponse['fields'][number]
}>()

const value = computed(() => {
  const field = data.fields.find((f) => f.name === type.name)
  return field ? field.value : null
})
</script>
