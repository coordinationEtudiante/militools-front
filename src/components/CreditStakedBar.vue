<template>
  <MCard class="flex flex-col gap-1">
    <template #header>
      <header class="mb-2 tracking-tighter text-balance text-highlighted">
        <div class="flex justify-between text-2xl">
          {{ t('remaning-credit') }}
          <UButton variant="ghost" color="neutral" class="p-0">
            <RotateCw :class="{ 'animate-spin': searchCreditStore.loading }" :size="12" />
          </UButton>
        </div>
        <div class="text-xl">
          {{
            t('consumed-credit', {
              total,
              consumed,
            })
          }}
        </div>
      </header>
    </template>
    <div class="flex h-4 w-full rounded-md">
      <div class="h-full rounded-l-md bg-error" :style="{ width: regularConsumption }" />

      <div
        class="h-full bg-warning"
        :class="{ 'rounded-l-md': regularConsumption == '0%', 'rounded-r-md': consumed == total }"
        :style="{ width: extraConsumption }"
      />

      <div
        class="h-full flex-1 rounded-r-md bg-success"
        :class="{ 'rounded-md': regularConsumption == '0%' && extraConsumption == '0%' }"
      />
    </div>
    <UButton v-if="consumed >= total" disabled color="neutral" variant="soft" class="w-fit">
      <UAlert color="info" size="xs">{{ 'not implemented yet' }}</UAlert>
      {{ t('get-more-credit') }}
    </UButton>
  </MCard>
</template>

<script setup lang="ts">
import MCard from '@/components/MCard.vue'
import { useSearchCreditStore } from '@/stores/searchCredit.store'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RotateCw } from '@lucide/vue'

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
