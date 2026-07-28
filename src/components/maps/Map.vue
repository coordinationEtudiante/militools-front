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
    <MapAppLink :geo :label />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MapAppLink from './mapAppLink.vue'

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
