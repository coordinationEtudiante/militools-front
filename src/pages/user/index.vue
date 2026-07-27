<script setup lang="ts">
import ActionList from '@/components/actions/ActionList.vue'
import PresentationText from '@/components/actions/presentationText.vue'
import MCard from '@/components/MCard.vue'
import WelcomeName from '@/components/WelcomeName.vue'
import { router } from '@/router'
import { useActionStore } from '@/stores/action.store'
import { usePermStore } from '@/stores/perm.store'
import { Button } from 'primevue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const actionStore = useActionStore()
const { getPerm } = usePermStore()

getPerm(':area/action/list')

const createPerm = computed(() => getPerm(':area/action/list', false))
</script>

<template>
  <div class="flex w-full min-w-0 flex-col gap-2 overflow-x-hidden">
    <div class="mb-4 flex min-w-0 flex-col gap-2">
      <!-- header -->
      <h1 class="text-6xl tracking-tighter text-balance text-gray-950">
        <WelcomeName />
      </h1>
      <p class="text-base text-gray-700">
        <PresentationText />
      </p>
    </div>
    <div class="flex flex-col gap-2 rounded-xl border border-gray-300 p-4">
      <!-- page -->
      <div class="flex w-full flex-row-reverse p-2" v-if="createPerm">
        <!-- action -->
        <Button severity="contrast" @click="router.push('/user/action/create')">
          {{ t('new-action') }}
        </Button>
      </div>
      <!-- page -->
      <MCard :title="t('your-registered-action')">
        <ActionList orienation="horizontal" :actions="actionStore.getParticipatingAction" />
      </MCard>
      <MCard :title="t('other-week-action')">
        <ActionList orienation="horizontal" :actions="actionStore.GetNotParticipatingAction" />
      </MCard>
    </div>
  </div>
</template>
