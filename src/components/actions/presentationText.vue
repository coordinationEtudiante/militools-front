<template>
  <template v-if="hasPerm">
    {{ presentation }}
  </template>
</template>

<script setup lang="ts">
import { useActionStore } from '@/stores/action.store'
import { usePermStore } from '@/stores/perm.store'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { getPerms } = usePermStore()
const actionStore = useActionStore()

const { t } = useI18n()

//TODO: load this when action store is created
const nbAction = computed(() => actionStore.getParticipatingAction.length)

const hasPerm = getPerms([':area/routes/getRoutes', ':area/action/list'], false)

const presentation = computed(() => {
  if (nbAction.value == 0) {
    return t('action:presentation:no-action')
  } else if (nbAction.value > 0 && nbAction.value <= 2) {
    return t('action:presentation:low', { nbAction })
  } else if (nbAction.value > 2 && nbAction.value < 5) {
    return t('action:presentation:many', { nbAction })
  } else if (nbAction.value > 5 && nbAction.value < 7) {
    return t('action:presentation:legend', { nbAction })
  } else {
    return t('action:presentation:insane', { nbAction })
  }
})
</script>
