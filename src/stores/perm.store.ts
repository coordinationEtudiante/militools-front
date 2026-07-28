import { getPerm as fetchPerm } from '@/cloud-functions/perm/getPerm'
import { router } from '@/router'
import type { CloudFunctionRoute } from '@/types/cloud-functions'
import type { getPermFetch } from '@/types/cloud-functions/perm/getPerm'
import { StorageSerializers, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type StoredSession = {
  cachedAt: string
  authorizedRoutes: getPermFetch['res']['autorizedRoutes']
  routes: getPermFetch['res']['routes']
}

const STORAGE_KEY = 'militools:perm-session'

export const usePermStore = defineStore('perm', () => {
  const storage = useStorage<StoredSession | null>(STORAGE_KEY, null, undefined, {
    serializer: StorageSerializers.object,
  })
  const loading = ref(false)
  const errored = ref(false)

  const hasSession = computed(() => Boolean(storage.value?.routes.length))
  const authorizedRoutes = computed(() => storage.value?.authorizedRoutes ?? [])
  const routes = computed(() => storage.value?.routes ?? [])

  async function hydrate() {
    if (hasSession.value) return

    loading.value = true
    errored.value = false

    try {
      const req = fetchPerm()
      await req.loadingPromise.value

      if (req.error.value || !req.data.value) {
        storage.value = null
        errored.value = true
        return
      }

      storage.value = {
        cachedAt: new Date().toISOString(),
        authorizedRoutes: req.data.value.autorizedRoutes,
        routes: req.data.value.routes,
      }
    } catch {
      storage.value = null
      errored.value = true
    } finally {
      loading.value = false
    }
  }

  function getPerms(routes: CloudFunctionRoute[], redirect?: boolean) {
    return routes.some((route) => getPerm(route, redirect))
  }

  function getPerm(route: CloudFunctionRoute, redirect?: boolean) {
    if (!hasSession.value) {
      if (redirect) throw router.replace('/403')
      else return false
    }

    const routeEntry = routes.value.find((r) => r.routes === route || r.routes == '/' + route)

    if (!routeEntry) {
      if (redirect) throw router.replace({ path: '/403', query: { routes: route } })
      return false
    }

    const routePerm = authorizedRoutes.value.find((ar) => ar.id === routeEntry.id)
    if (!routePerm) {
      if (redirect)
        throw router.replace({
          path: '/403',
          query: { routes: route, permLevels: routeEntry.level ?? undefined },
        })
      return false
    }

    return routePerm.routePermLevels ?? true
  }

  void hydrate()

  return {
    loading,
    errored,
    hasSession,
    authorizedRoutes,
    routes,
    getPerm,
    getPerms,
    hydrate,
  }
})
