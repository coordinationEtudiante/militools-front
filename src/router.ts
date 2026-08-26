import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { testToken } from '@/cloud-functions/auth/testToken'
import { useUserStore } from '@/stores/user.store'
import { useAreaStore } from '@/stores/area.store'
import { fetchError } from '@/errors/fetch.error'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

let tokenValidated = false

router.beforeEach(async (to) => {
  if (to.path === '/') {
    const userStore = useUserStore()
    return userStore.connected ? '/user' : '/auth/login'
  }

  if (to.path.startsWith('/auth') || to.path === '/403' || to.path === '/no-server-routes' || to.path === '/area/no-joined') {
    return
  }

  const userStore = useUserStore()

  if (to.path.startsWith('/user') && !userStore.connected) {
    return '/auth/login'
  }

  if (userStore.connected && !tokenValidated) {
    try {
      await testToken()
      tokenValidated = true
    } catch (err) {
      if (err instanceof fetchError && (err.status === 401 || err.status === 403)) {
        tokenValidated = false
        userStore.clearSession()
        return '/auth/login'
      }
    }
  }

  if (to.path.startsWith('/user') && userStore.connected) {
    useAreaStore()
  }
})
