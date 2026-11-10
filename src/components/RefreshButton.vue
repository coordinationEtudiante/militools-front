<script setup lang="ts">
import { useToast } from '@nuxt/ui/composables/useToast'
import { RotateCw } from '@lucide/vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ refresh: () => Promise<void> }>()
const toast = useToast()
const { t } = useI18n()

const isLoading = ref<boolean>(false)

async function refreshClick() {
  isLoading.value = true
  await props
    .refresh()
    .catch((err) => {
      const msg = String(err)
      toast.add({
        color: 'error',
        title: t('refresh.error'),
        description: msg,
        duration: 3000,
      })
    })
    .finally(() => (isLoading.value = false))
}
</script>

<template>
  <UButton variant="ghost" color="neutral" class="p-0">
    <RotateCw :size="24" @click="refreshClick" :class="{ 'animate-spin': isLoading }" />
  </UButton>
</template>
