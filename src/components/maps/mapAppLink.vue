<template>
  <div class="tag flex items-center gap-2" @click="openMaps">
    <MapPin />
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { MapPin } from '@lucide/vue'
import { computed } from 'vue'

const { geo, label } = defineProps<{
  geo: { x: string | number; y: string | number }
  label: string
}>()

const lat = computed(() => normalizeCoordinate(geo.x))
const lng = computed(() => normalizeCoordinate(geo.y))

function normalizeCoordinate(value: string | number) {
  const parsed = typeof value === 'number' ? value : Number.parseFloat(String(value))
  return Number.isFinite(parsed) ? parsed : null
}

function isSafari() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return /Safari/.test(ua) && !/Chrome|CriOS|Chromium|Edg|OPR|FxiOS/.test(ua)
}

function openMaps() {
  const ua = navigator.userAgent.toLowerCase()
  let url = ''

  if (/iphone|ipad|ipod/.test(ua)) {
    if (lat.value != null && lng.value != null) url = `maps://?q=${lat.value},${lng.value}`
  } else if (/android/.test(ua)) {
    if (lat.value != null && lng.value != null)
      url = `geo:${lat.value},${lng.value}?q=${lat.value},${lng.value}(${encodeURIComponent(label)})`
  } else {
    // web: prefer Apple Maps on Safari, Google Maps elsewhere
    if (lat.value != null && lng.value != null) {
      if (isSafari()) {
        url = `https://maps.apple.com/?ll=${lat.value},${lng.value}&q=${encodeURIComponent(label)}`
      } else {
        url = `https://www.google.com/maps/search/?api=1&query=${lat.value},${lng.value}`
      }
    }
  }

  window.location.href = url
}
</script>
