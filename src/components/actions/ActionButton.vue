<template>
  <div class="flex gap-2">
    <template v-if="props.action.awnser === null">
      <Button severity="success" @click="participate" :loading="loading">
        {{ t('button.participate') }}
      </Button>
      <Button severity="warn" @click="dontParticipate" :loading="loading">
        {{ t('button.not-participate') }}
      </Button>
    </template>
    <template v-else-if="props.action.awnser === false">
      <!-- share ? -->
      <Button severity="success" @click="participate" :loading="loading">
        {{ t('button.its-ok') }}
      </Button>
    </template>
    <template v-else>
      <!-- share ? -->
      <Button severity="danger" @click="dontParticipate" :loading="loading">
        {{ t('button.give-up') }}
      </Button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useActionStore, type Action } from '@/stores/action.store'
import { Button } from 'primevue'
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
