<template>
  <div class="flex gap-2">
    <template v-if="props.action.awnser === null">
      <UButton color="success" variant="solid" @click="participate" :loading="loading">
        {{ t('button.participate') }}
      </UButton>
      <UButton color="warning" variant="solid" @click="dontParticipate" :loading="loading">
        {{ t('button.not-participate') }}
      </UButton>
    </template>
    <template v-else-if="props.action.awnser === false">
      <!-- share ? -->
      <UButton color="success" variant="solid" @click="participate" :loading="loading">
        {{ t('button.its-ok') }}
      </UButton>
    </template>
    <template v-else>
      <!-- share ? -->
      <UButton color="error" variant="solid" @click="dontParticipate" :loading="loading">
        {{ t('button.give-up') }}
      </UButton>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useActionStore, type Action } from '@/stores/action.store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { setActionResponse, loading } = useActionStore()

const props = defineProps<{
  action: Action
}>()

const participate = () => {
  setActionResponse(props.action.id, true)
}
const dontParticipate = () => {
  setActionResponse(props.action.id, false)
}
</script>
