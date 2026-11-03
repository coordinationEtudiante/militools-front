<script setup lang="ts">
import Dicebear from '@/components/Dicebear.vue'
import { router } from '@/router'
import { useAreaStore } from '@/stores/area.store'
import { usePermStore } from '@/stores/perm.store'
import { useUserStore } from '@/stores/user.store'
import { Style } from '@dicebear/core'
import definition from '@dicebear/styles/shape-grid.json' with { type: 'json' }
import { BookUser, Clapperboard, Hash, Gavel, Users, UserSearch } from '@lucide/vue'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

/* ---------- constants ---------- */

const style = new Style(definition)

const userStore = useUserStore()
const areaStore = useAreaStore()
const permStore = usePermStore()

const { t } = useI18n()

const seed = computed(() => String(userStore.connected ? userStore.user.id : 0))
const area = computed(() => areaStore.getArea())
const areaItems = computed(() => areaStore.areas.map((area) => ({ id: area.id, name: area.name })))
const actionPerm = computed(() => permStore.getPerm(':area/action/list', false))
const searchPerm = computed(() => permStore.getPerm(':area/contact/getContacts', false))
const contactPerm = computed(
  () => permStore.getPerm(':area/contact/getContacts', false) === 'admin',
)

const selectedArea = ref(area.value.id)

watch(selectedArea, () => {
  areaStore.setSelectedArea(selectedArea.value)
  router.clearRoutes()
  router.push('/user')
})

const goToSetting = () => {
  router.push('/user/settings')
}
</script>

<template>
  <!-- user info -->
  <div class="flex justify-between gap-4 rounded-xl border border-default p-4 md:flex-col">
    <div class="flex md:flex-col">
      <UTooltip :text="userStore.user.name">
        <UButton variant="ghost" color="neutral" class="p-1 cursor-pointer hover:scale-110 focus-visible:scale-110" @click="goToSetting">
          <Dicebear :seed :size="32" />
        </UButton>
      </UTooltip>
    </div>
    <!-- action buttons -->
    <div class="mx-auto flex gap-4 md:flex-col">
      <UButton variant="ghost" color="neutral" class="p-1 cursor-pointer hover:scale-110 focus:outline-none focus-visible:scale-110" @click="router.push('/user')" v-if="actionPerm" >
        <Clapperboard :size="24" />
      </UButton>
      <UButton variant="ghost" color="neutral" class="p-1 cursor-pointer hover:scale-110 focus:outline-none focus-visible:scale-110" @click="router.push('/user/contact')" v-if="contactPerm">
        <span class="inline-block hover:scale-110 focus-visible:scale-110">
          <BookUser :size="24" />
        </span>
      </UButton>
      <UButton variant="ghost" color="neutral" class="p-1 cursor-pointer hover:scale-110 focus:outline-none focus-visible:scale-110" @click="router.push('/user/contact/search')" v-if="searchPerm">
        <UserSearch :size="24" />
      </UButton> 
      <UButton variant="ghost" color="neutral" class="p-1 cursor-pointer hover:scale-110 focus:outline-none focus-visible:scale-110">
        <Gavel :size="24" />
      </UButton> 
      <UButton variant="ghost" color="neutral" class="p-1 cursor-pointer hover:scale-110 focus:outline-none focus-visible:scale-110" @click="router.push('/user/contact')" v-if="contactPerm">
        <Users :size="24" />
      </UButton>
    </div>
    <!-- area selector -->
    <div class="flex md:flex-col">
      <UPopover :modal="true" :ui="{ content: 'p-3'}">
        <button
          type="button"
          variant="ghost"
          class="p-1 cursor-pointer hover:scale-110 focus:outline-none focus-visible:scale-110 rounded-full"
          :title="area.name ?? undefined"
        >
          <Dicebear
            :seed="area.id.toString()"
            :size="32"
            :style="style"
            :option="{ borderRadius: 10 }"
            class="cursor-pointer"
          />
        </button>
        <template #content>
          <div class="w-80">
            <div class="flex items-start justify-between">
              <div class="flex w-full items-center justify-between">
                <span class="text-base font-semibold">
                  {{ t('you-are-on-area', { area: area.name }) }}
                </span>
                <UBadge color="neutral" size="xs" variant="soft" class="flex items-center gap-1">
                  <Hash :size="10" />
                  {{ area.id.toString() }}
                </UBadge>
              </div>
            </div>
            <div class="mt-4 flex items-start justify-between gap-2">
              {{ t('select-other-area:') }}
              <USelectMenu
                v-model="selectedArea"
                :items="areaItems"
                value-key="id"
                label-key="name"
                :placeholder="t('select-area')"
              />
            </div>
          </div>
        </template>
      </UPopover>
    </div>
  </div>
</template>
