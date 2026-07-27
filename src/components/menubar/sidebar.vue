<script setup lang="ts">
import Dicebear from '@/components/Dicebear.vue'
import { router } from '@/router'
import { useAreaStore } from '@/stores/area.store'
import { useUserStore } from '@/stores/user.store'
import { Style } from '@dicebear/core'
import definition from '@dicebear/styles/shape-grid.json' with { type: 'json' }
import { BookUser, Clapperboard, Hash, Gavel, Users } from '@lucide/vue'
import { Button, Popover, Select, Tag } from 'primevue'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const style = new Style(definition)

const userStore = useUserStore()
const areaStore = useAreaStore()

const { t } = useI18n()

const seed = computed(() => String(userStore.connected ? userStore.user.id : 0))
const area = computed(() => areaStore.getArea())

const selectedArea = ref(area.value.id)
const po = ref()

watch(selectedArea, () => {
  areaStore.setSelectedArea(selectedArea.value)
  router.clearRoutes()
  router.push('/user')
})

const toggle = (event) => {
  po.value.toggle(event)
}

const goToSetting = () => {
  router.push('/user/settings')
}
</script>

<template>
  <div class="flex flex-col justify-between gap-4 rounded-xl border border-gray-300 p-4">
    <div class="flex flex-col">
      <Button unstyled @click="goToSetting">
        <Dicebear :seed :size="32" v-tooltip="userStore.user.name" />
      </Button>
    </div>
    <div class="flex flex-col gap-4">
      <Clapperboard :size="24" />
      <BookUser :size="24" />
      <Gavel :size="24" />
      <Users :size="24" />
    </div>
    <div class="flex flex-col">
      <Dicebear
        :seed="area.id.toString()"
        :size="32"
        :style="style"
        :option="{ borderRadius: 10 }"
        v-tooltip="area.name"
        @click="toggle"
      />
      <Popover ref="po">
        <div class="w-80">
          <div class="flex items-start justify-between">
            <div class="flex w-full items-center justify-between">
              <span class="text-base font-semibold">
                {{ t('you-are-on-area', { area: area.name }) }}
              </span>
              <Tag severity="secondary" class="flex items-center text-xs text-gray-500">
                <Hash :size="10" />
                {{ area.id.toString() }}
              </Tag>
            </div>
          </div>
          <div class="mt-4 flex items-start justify-between gap-2">
            {{ t('select-other-area:') }}
            <Select
              v-model="selectedArea"
              :options="areaStore.areas"
              :placeholder="t('select-area')"
              optionLabel="name"
              optionValue="id"
            />
          </div>
        </div>
      </Popover>
    </div>
  </div>
</template>
