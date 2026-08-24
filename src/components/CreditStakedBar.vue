<template>
  <MCard
    :title="t('remaning-credit')"
    :subtitle="
      t('consumed-credit', {
        total,
        consumed,
      })
    "
    class="flex flex-col gap-1"
  >
    <div class="flex h-4 w-full rounded-md">
      <div class="h-full rounded-l-md bg-red-700" :style="{ width: regularConsumption }" />

      <div
        class="h-full bg-yellow-700"
        :class="{ 'rounded-l-md': regularConsumption == '0%', 'rounded-r-md': consumed == total }"
        :style="{ width: extraConsumption }"
      />

      <div
        class="h-full flex-1 rounded-r-md bg-green-700"
        :class="{ 'rounded-md': regularConsumption == '0%' && extraConsumption == '0%' }"
      />
    </div>
    <Button v-if="consumed >= total" disabled class="w-fit">
      <Message severity="info">{{ 'not implemented yet' }}</Message>
      {{ t('get-more-credit') }}
    </Button>
  </MCard>
</template>

<script setup lang="ts">
import MCard from '@/components/MCard.vue'
import { useSearchCreditStore } from '@/stores/searchCredit.store'
import { Button } from 'primevue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const searchCreditStore = useSearchCreditStore()

const total = computed(() => searchCreditStore.totalAvaibleCredit)
const consumed = computed(() => searchCreditStore.getConsumedCredit)

const regularConsumption = computed(() => {
  const regular = Math.min(searchCreditStore.getDayCredit, searchCreditStore.getConsumedCredit)

  return `${(regular / total.value) * 100}%`
})

const extraConsumption = computed(() => {
  const extra = Math.max(searchCreditStore.getConsumedCredit - searchCreditStore.getDayCredit, 0)

  return `${(extra / total.value) * 100}%`
})
</script>
