<script setup lang="ts">
import { Phone } from '@lucide/vue'
import { useEventListener } from '@vueuse/core'
import { FloatLabel, IconField, InputIcon, InputText } from 'primevue'
import { computed, nextTick, ref, watch, type CSSProperties } from 'vue'
import { useI18n } from 'vue-i18n'
import { clearPhone } from '@/tools/phone.utils'

export interface PhoneSuggestion {
  value: string
  detail?: string
}

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    invalid?: boolean
    suggestions?: PhoneSuggestion[]
    tabindex?: number
  }>(),
  { disabled: false, invalid: false },
)

const phone = defineModel<string>('phone', { required: true })

const emit = defineEmits<{
  select: [value: string]
  search: [value: string]
}>()

const { t } = useI18n()

const mask = { mask: '+99 9 99 99 99 99', slotChar: ' ' }

const rootEl = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const open = ref(false)
const activeIndex = ref(-1)
const panelStyle = ref<CSSProperties>({ top: '0px', left: '0px', width: '0px', position: 'fixed' })

const digits = (value: string) => (value ?? '').replace(/\D/g, '')
const normalizeDigits = (value: string) => digits(clearPhone(digits(value)))

function pretty(value: string): string {
  const d = normalizeDigits(value)
  if (d.startsWith('33') && d.length === 11) {
    return `+33 ${d[2]} ${d.slice(3, 5)} ${d.slice(5, 7)} ${d.slice(7, 9)} ${d.slice(9, 11)}`
  }
  return value
}

const filteredSuggestions = computed(() => {
  if (!props.suggestions?.length) return []
  const query = normalizeDigits(phone.value)
  if (!query) return [...props.suggestions]
  return props.suggestions.filter((suggestion) => normalizeDigits(suggestion.value).includes(query))
})

let lastQueryEmitted = digits(phone.value)

function updatePosition() {
  const input = rootEl.value?.querySelector('input')
  if (!input) return
  const rect = input.getBoundingClientRect()
  panelStyle.value = {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    position: 'fixed',
  }
}

let removeScroll: (() => void) | undefined
let removeResize: (() => void) | undefined

watch(open, (value) => {
  if (value) {
    updatePosition()
    removeScroll = useEventListener(window, 'scroll', updatePosition, true)
    removeResize = useEventListener(window, 'resize', updatePosition)
  } else {
    removeScroll?.()
    removeResize?.()
    removeScroll = undefined
    removeResize = undefined
  }
})

function scrollActiveIntoView() {
  nextTick(() => {
    if (activeIndex.value < 0 || !panelRef.value) return
    const panel = panelRef.value
    const item = panel.querySelector<HTMLElement>(`[data-index="${activeIndex.value}"]`)
    if (!item) return
    if (item.offsetTop < panel.scrollTop) {
      panel.scrollTop = item.offsetTop
    } else if (item.offsetTop + item.offsetHeight > panel.scrollTop + panel.clientHeight) {
      panel.scrollTop = item.offsetTop - panel.clientHeight + item.offsetHeight
    }
  })
}

function onFocus() {
  open.value = true
  activeIndex.value = -1
}

function placeCaret() {
  nextTick(() => {
    const input = rootEl.value?.querySelector<HTMLInputElement>('input')
    if (!input) return
    const trimmed = input.value.replace(/[\s-]+$/, '')
    input.setSelectionRange(trimmed.length, trimmed.length)
  })
}

function onInput(event: Event) {
  const raw = digits((event.target as HTMLInputElement).value)
  open.value = true
  activeIndex.value = -1
  let query = raw
  if (raw.startsWith('0')) {
    const converted = clearPhone(raw)
    query = digits(converted)
    phone.value = converted
    placeCaret()
  }
  if (query !== lastQueryEmitted) {
    lastQueryEmitted = query
    emit('search', query)
  }
  updatePosition()
}

function normalize() {
  const raw = digits(phone.value)
  if (!raw) return
  const normalized = clearPhone(raw)
  if (normalized !== phone.value) {
    phone.value = normalized
  }
}

function onBlur() {
  open.value = false
  activeIndex.value = -1
  normalize()
}

function select(suggestion: PhoneSuggestion) {
  phone.value = clearPhone(suggestion.value)
  activeIndex.value = -1
  open.value = false
  emit('select', suggestion.value)
}

function onKeydown(event: KeyboardEvent) {
  const list = filteredSuggestions.value
  const hasItems = list.length > 0

  if (event.key === 'ArrowDown' && hasItems) {
    event.preventDefault()
    event.stopPropagation()
    open.value = true
    activeIndex.value =
      activeIndex.value >= list.length - 1 ? list.length - 1 : activeIndex.value + 1
    scrollActiveIntoView()
  } else if (event.key === 'ArrowUp' && hasItems) {
    event.preventDefault()
    event.stopPropagation()
    activeIndex.value = activeIndex.value <= 0 ? 0 : activeIndex.value - 1
    scrollActiveIntoView()
  } else if (event.key === 'Enter' && open.value && hasItems) {
    event.preventDefault()
    event.stopPropagation()
    select(list[activeIndex.value >= 0 ? activeIndex.value : 0])
  } else if (event.key === 'Escape' && open.value) {
    event.preventDefault()
    event.stopPropagation()
    open.value = false
    activeIndex.value = -1
  }
}

watch(filteredSuggestions, (list) => {
  if (activeIndex.value >= list.length) {
    activeIndex.value = list.length - 1
  }
})
</script>

<template>
  <div ref="rootEl" @keydown.capture="onKeydown">
    <FloatLabel variant="on">
      <IconField>
        <InputIcon>
          <Phone :size="15" />
        </InputIcon>
        <InputText
          type="tel"
          v-model="phone"
          v-mask="mask"
          inputmode="numeric"
          :disabled="props.disabled"
          :invalid="props.invalid"
          :tabindex="props.tabindex"
          fluid
          @focus="onFocus"
          @input="onInput"
          @blur="onBlur"
        />
      </IconField>
      <label for="phone">{{ t('input.phone') }}</label>
    </FloatLabel>

    <Teleport to="body">
      <div
        v-if="open && filteredSuggestions.length > 0"
        ref="panelRef"
        :style="panelStyle"
        class="z-50 max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-white py-1 shadow-lg"
      >
        <button
          v-for="(suggestion, index) in filteredSuggestions"
          :key="suggestion.value"
          type="button"
          :data-index="index"
          :class="[
            'flex w-full cursor-pointer flex-col gap-0.5 px-3 py-2 text-left text-sm text-gray-800',
            'hover:bg-gray-100',
            activeIndex === index && 'bg-gray-100',
          ]"
          @mousedown.prevent
          @click="select(suggestion)"
          @mouseenter="activeIndex = index"
        >
          <span>{{ pretty(suggestion.value) }}</span>
          <span v-if="suggestion.detail" class="text-xs text-gray-500">
            {{ suggestion.detail }}
          </span>
        </button>
      </div>
    </Teleport>
  </div>
</template>
