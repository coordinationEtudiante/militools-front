import { reactiveFetch } from '@/tools/fetch.utils'
import type { LoginFetch } from '@/types/cloud-functions/auth/login.type'

export function login(body: LoginFetch['req'], immediate = true) {
  return reactiveFetch('auth/login', {
    body,
    method: 'POST',
    immediate,
  })
}
