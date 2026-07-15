import { reactiveFetch } from '@/tools/fetch.utils'
import type { RegisterFetch } from '@/types/cloud-functions/auth/register.type'

export function register(body: RegisterFetch['req'], immediate = true) {
  return reactiveFetch('auth/register', {
    body,
    immediate,
  })
}
