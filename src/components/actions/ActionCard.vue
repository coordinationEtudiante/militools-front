<template>
  <MCard class="w-full min-w-full shrink-0 overflow-hidden sm:max-w-100 sm:min-w-75">
    <template #header>
      <div class="relative w-full">
        <img
          v-if="action.image"
          :src="imageUrl"
          :alt="action.image.alt ?? action.title"
          class="h-48 w-full rounded-t-xl object-cover"
          loading="lazy"
        />
        <div v-else class="flex h-48 w-full items-center justify-center rounded-t-xl bg-gray-100">
          <ImageOff class="h-12 w-12 text-gray-400" />
        </div>
        <Tag
          v-if="action.awnser !== null"
          :severity="action.awnser ? 'success' : 'warn'"
          class="absolute top-2 right-2"
        >
          {{ action.awnser ? t('action.participating') : t('action.not-participating') }}
        </Tag>
      </div>
    </template>

    <template #default>
      <div class="flex flex-col gap-2">
        <RouterLink
          :to="{ name: '/user/action/[id]', params: { id: action.id } }"
          class="text-xl font-bold tracking-tight text-gray-950 hover:underline"
        >
          {{ action.title }}
        </RouterLink>

        <div class="flex flex-wrap gap-2">
          <Tag v-if="action.locationName" severity="secondary">
            <MapAppLink :geo="action.location" :label="action.locationName" />
          </Tag>
          <Tag severity="secondary">
            <template #icon>
              <Megaphone class="h-4 w-4" />
            </template>
            {{ area?.name ?? action.area }}
          </Tag>
        </div>

        <p v-if="action.description" class="line-clamp-3 text-sm text-gray-600">
          {{ action.description }}
        </p>

        <div class="mt-1 flex items-center gap-3 text-xs text-gray-500">
          <span v-if="action.dateStart" class="flex items-center gap-1">
            <Calendar class="h-3.5 w-3.5" />
            {{ formatDate(action.dateStart) }}
          </span>
          <span v-if="action.dateEnd" class="flex items-center gap-1">
            <Clock class="h-3.5 w-3.5" />
            {{ formatDate(action.dateEnd) }}
          </span>
        </div>
      </div>
    </template>

    <template #footer v-if="replyPerm">
      <ActionButton :action />
    </template>
  </MCard>
</template>

<script setup lang="ts">
import type { Action } from '@/stores/action.store'
import { useAreaStore } from '@/stores/area.store'
import { computed } from 'vue'
import { usePermStore } from '@/stores/perm.store'
import { Tag } from 'primevue'
import { Megaphone, Calendar, Clock, ImageOff } from '@lucide/vue'
import { getBaseUrl } from '@/tools/fetch.utils'
import { useI18n } from 'vue-i18n'
import MCard from '@/components/MCard.vue'
import MapAppLink from '@/components/maps/mapAppLink.vue'
import ActionButton from '@/components/actions/ActionButton.vue'

const { action } = defineProps<{
  action: Action
}>()

const { t } = useI18n()
const { getArea } = useAreaStore()
const { getPerm } = usePermStore()

const area = computed(() => getArea())
const replyPerm = computed(() => getPerm(':area/action/reply', false))

const imageUrl = computed(() => {
  if (!action.image) return ''
  return `${getBaseUrl()}images/upload/${action.image.id}`
})

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>
