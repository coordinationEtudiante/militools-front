<template>
  <div class="map">
    <iframe
      v-if="osmEmbedUrl"
      :src="osmEmbedUrl"
      style="border: 0; width: 90%; height: 300px"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="map-iframe"
    />
    <div v-else class="map-empty">Coordonnées invalides</div>
    <div class="tag flex items-center gap-2" @click="openMaps">
      <MapPin class="h-4 w-4" />
      <span>{{ label }}</span>
    </div>
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

const osmEmbedUrl = computed(() => {
  if (lat.value == null || lng.value == null) return ''
  const marker = `${lat.value}%2C${lng.value}`
  const zoom = 15
  // bbox small area around point
  const delta = 0.01
  const left = lng.value - delta
  const right = lng.value + delta
  const top = lat.value + delta
  const bottom = lat.value - delta
  const bbox = `${left}%2C${bottom}%2C${right}%2C${top}`
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}&zoom=${zoom}`
})
</script>

<style lang="postcss" scoped>
.map {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  align-items: center;

  .map-iframe {
    width: 90%;
    border-radius: var(--p-form-field-border-radius);
  }

  .map-empty {
    width: 90%;
    min-height: 300px;
    display: grid;
    place-items: center;
    border-radius: var(--p-form-field-border-radius);
    background: var(--surface-100);
    color: var(--text-color-secondary);
  }

  .tag {
    width: 90%;
    cursor: pointer;
  }

  .tag:hover {
    text-decoration: underline;
  }
}
</style>
