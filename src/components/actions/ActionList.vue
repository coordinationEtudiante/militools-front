<template>
  <span
    class="flex w-full justify-around gap-2 p-2"
    :class="[{ vertical: 'flex-col', horizontal: 'w-full overflow-y-scroll', fluid: 'flex-col' }]"
  >
    <SkeletonActionCard type="registred" v-if="skeleton" />
    <ActionCard v-for="action in actions" :action="action" :key="action.id" :fluid />
    <Message v-if="noAction">{{ t('is-empty') }}</Message>
  </span>
</template>
<script setup lang="ts">
import type { Action } from '@/stores/action.store'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionCard from '@/components/actions/ActionCard.vue'
import SkeletonActionCard from '@/components/actions/SkeletonActionCard.vue'

const { t } = useI18n()

const { actions, orienation } = defineProps<{
  actions: Action[]
  orienation: 'vertical' | 'horizontal'
  skeleton?: boolean
}>()

const fluid = computed(() => {
  return actions.length == 1 || orienation == 'vertical'
})

const noAction = computed(() => actions.length === 0)
</script>

<style lang="postcss" scoped>
.actions-container {
  display: flex;
  justify-content: space-around;
  gap: var(--gap);
  padding: var(--gap);

  &.vertical,
  &.fluid {
    flex-direction: column;
  }

  &.horizontal {
    overflow-y: scroll;
  }
}
</style>
