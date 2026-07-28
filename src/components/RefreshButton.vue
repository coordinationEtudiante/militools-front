<script setup lang="ts">
import { Button, Toast, useToast } from 'primevue'
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
        severity: 'error',
        summary: t('refresh.error'),
        detail: msg,
        life: 3000,
      })
    })
    .finally(() => (isLoading.value = false))
}
</script>

<template>
  <Toast />
  <Button severity="contrast">
    <RotateCw :size="24" @click="refreshClick" :class="{ 'animate-spin': isLoading }" />
  </Button>
</template>
