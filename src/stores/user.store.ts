import { router } from '@/router'
import type { LoginFetch } from '@/types/cloud-functions/auth/login.type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { StorageSerializers, useStorage } from '@vueuse/core'

type StoredUser = Omit<LoginFetch['res'], 'token'>
type StoredSession = {
  user: StoredUser
  token: string
}

const STORAGE_KEY = 'militools:user-session'

function redirectToLogin() {
  if (router.currentRoute.value.path !== '/auth/login') {
    void router.replace('/auth/login')
  }
}

function requireSession(session: StoredSession | null): StoredSession {
  if (
    (!session || !session.user || !session.token) &&
    router.currentRoute.value.path !== '/auth/login'
  ) {
    redirectToLogin()
    throw new Error('User session is missing')
  }

  return session ?? ({} as StoredSession)
}

export const useUserStore = defineStore('user', () => {
  const session = useStorage<StoredSession | null>(STORAGE_KEY, null, undefined, {
    serializer: StorageSerializers.object,
  })
  const loading = ref<boolean>(false)
  const errored = ref<boolean>(false)

  const connected = computed(() => Boolean(session.value?.user && session.value?.token))
  const user = computed(() => requireSession(session.value).user)
  const token = computed(() => requireSession(session.value).token)

  async function login(user: StoredUser, token: string) {
    session.value = {
      user,
      token,
    }
  }

  function clearSession() {
    session.value = null
    errored.value = false
    loading.value = false
  }

  function logout() {
    clearSession()
    redirectToLogin()
  }

  return {
    user,
    token,
    loading,
    errored,
    connected,
    login,
    clearSession,
    logout,
  }
})
