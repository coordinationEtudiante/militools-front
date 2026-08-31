import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'militools:server-origin'

export function getDefaultServerOrigin() {
  if (typeof window === 'undefined') {
    return 'https://api.mt.qamp.fr/'
  }

  if (import.meta.env.MODE === 'development') {
    return 'http://127.0.0.1:8080/'
  }

  return 'https://api.mt.qamp.fr/'
}

function normalizeOrigin(origin: string) {
  return origin.endsWith('/') ? origin : `${origin}/`
}

export const useServerStore = defineStore('server', () => {
  const defaultServer = normalizeOrigin(getDefaultServerOrigin())
  const selectedServer = useLocalStorage(STORAGE_KEY, defaultServer)

  const baseUrl = computed(() => normalizeOrigin(selectedServer.value || defaultServer))

  function setServer(origin: string) {
    selectedServer.value = normalizeOrigin(origin)
  }

  return {
    defaultServer,
    selectedServer,
    baseUrl,
    setServer,
  }
})
