<script setup lang="ts">
import { ref, watch } from 'vue'
import 'leaflet/dist/leaflet.css'

import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

type AddressResult = {
  display_name: string
  lat: string
  lon: string
}

const emit = defineEmits<{
  change: [
    {
      address: string
      lat: number
      lng: number
    },
  ]
}>()

const search = ref('')
const suggestions = ref<AddressResult[]>([])

const zoom = ref(13)

const position = ref<[number, number]>([48.8566, 2.3522])

const selectedAddress = ref('')

watch(search, (val) => {
  if (typeof val === 'object' && val !== null && 'lat' in val && 'lon' in val) {
    selectAddress(val as AddressResult)
  }
})

interface LeafletHandle {
  setView(center: [number, number], zoom?: number): void
}

const map = ref<LeafletHandle | null>(null)

function onMapReady(mapInstance: LeafletHandle) {
  map.value = mapInstance
}

watch(position, ([lat, lng]) => {
  if (map.value) {
    map.value.setView([lat, lng], zoom.value)
  }
})

async function searchAddress(event: { query: string }) {
  const query = event.query

  if (!query || query.length < 3) {
    suggestions.value = []
    return
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&countrycodes=fr&q=${encodeURIComponent(query)}`,
    )

    const data: AddressResult[] = await response.json()

    suggestions.value = data
  } catch (error) {
    console.error(error)
  }
}

function selectAddress(result: AddressResult) {
  const lat = Number(result.lat)
  const lng = Number(result.lon)

  position.value = [lat, lng]
  search.value = result.display_name
  selectedAddress.value = result.display_name

  emit('change', {
    address: result.display_name,
    lat,
    lng,
  })
}

function handleSelect(value: string) {
  const result = suggestions.value.find((s) => s.display_name === value)
  if (result) {
    selectAddress(result)
  }
}

async function onMarkerDrag(event: unknown) {
  const e = event as {
    target: {
      getLatLng: () => {
        lat: number
        lng: number
      }
    }
  }

  const latlng = e.target.getLatLng()

  position.value = [latlng.lat, latlng.lng]

  await reverseGeocode(latlng.lat, latlng.lng)
}

async function reverseGeocode(lat: number, lng: number) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    )

    const data = await response.json()

    selectedAddress.value = data.display_name ?? ''

    search.value = selectedAddress.value

    emit('change', {
      address: selectedAddress.value,
      lat,
      lng,
    })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Search -->
    <UInputMenu
      v-model="search"
      :items="suggestions"
      value-key="display_name"
      label-key="display_name"
      @update:search-term="searchAddress({ query: $event })"
      @update:model-value="handleSelect"
      class="w-full"
    >
      <template #item="{ item }">
        <div class="text-sm">
          {{ item.display_name }}
        </div>
      </template>
    </UInputMenu>

    <!-- Map -->
    <div class="relative z-0 max-h-[30vh] overflow-hidden rounded-2xl border border-gray-200">
      <LMap
        v-model:zoom="zoom"
        :center="position"
        style="height: 400px; width: 100%"
        @ready="onMapReady"
      >
        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LMarker :key="position.join()" :lat-lng="position" draggable @dragend="onMarkerDrag" />
      </LMap>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-autocomplete-panel) {
  z-index: 99999 !important;
}
</style>
