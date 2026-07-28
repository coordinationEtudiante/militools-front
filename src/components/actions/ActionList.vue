<template>
  <div v-if="orientation === 'vertical'" class="flex flex-col gap-2">
    <SkeletonActionCard v-if="skeleton" type="default" />
    <template v-else>
      <ActionCard v-for="action in actions" :key="action.id" :action />
      <Message v-if="noAction">{{ t('is-empty') }}</Message>
    </template>
  </div>

  <div v-else class="relative w-full select-none">
    <SkeletonActionCard v-if="skeleton" type="default" />
    <template v-else>
      <button
        v-show="canScrollLeft"
        class="absolute top-1/2 -left-3 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md transition hover:bg-gray-100"
        @click="scrollLeft"
      >
        <ChevronLeft class="h-5 w-5 text-gray-700" />
      </button>

      <div
        ref="carouselRef"
        class="carousel-track scrollbar-hide flex snap-x snap-mandatory gap-2 overflow-x-auto p-2"
        @wheel="onWheel"
        @scroll="onScroll"
      >
        <ActionCard v-for="action in actions" :key="action.id" :action />
      </div>

      <button
        v-show="canScrollRight"
        class="absolute top-1/2 -right-3 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md transition hover:bg-gray-100"
        @click="scrollRight"
      >
        <ChevronRight class="h-5 w-5 text-gray-700" />
      </button>

      <p v-if="noAction" class="py-4 text-center text-sm text-gray-500">
        {{ t('is-empty') }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Action } from '@/stores/action.store'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionCard from '@/components/actions/ActionCard.vue'
import SkeletonActionCard from '@/components/actions/SkeletonActionCard.vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { Message } from 'primevue'

const { t } = useI18n()

const { actions, orientation } = defineProps<{
  actions: Action[]
  orientation: 'vertical' | 'horizontal'
  skeleton?: boolean
}>()

const noAction = computed(() => actions.length === 0)

const carouselRef = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

function updateScrollButtons() {
  const el = carouselRef.value
  if (!el) return
  canScrollLeft.value = el.scrollLeft > 4
  canScrollRight.value = el.scrollLeft < el.scrollWidth - el.clientWidth - 4
}

function onScroll() {
  updateScrollButtons()
}

function onWheel(e: WheelEvent) {
  const el = carouselRef.value
  if (!el || Math.abs(e.deltaY) >= Math.abs(e.deltaX)) return
  e.preventDefault()
  el.scrollBy({ left: e.deltaX, behavior: 'smooth' })
}

function onResize() {
  updateScrollButtons()
}

onMounted(() => {
  updateScrollButtons()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

function scrollLeft() {
  const el = carouselRef.value
  if (!el) return
  const cardWidth = el.children[0]?.clientWidth ?? el.clientWidth
  el.scrollBy({ left: -(cardWidth + getGap(el)), behavior: 'smooth' })
}

function scrollRight() {
  const el = carouselRef.value
  if (!el) return
  const cardWidth = el.children[0]?.clientWidth ?? el.clientWidth
  el.scrollBy({ left: cardWidth + getGap(el), behavior: 'smooth' })
}

function getGap(el: HTMLElement) {
  const style = getComputedStyle(el)
  return parseInt(style.columnGap) || 0
}
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.carousel-track {
  touch-action: pan-x pan-y;
}
</style>
