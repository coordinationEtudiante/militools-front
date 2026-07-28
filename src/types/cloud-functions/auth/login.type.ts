import type { FetchDefault } from '../FetchDefault.type'

export const LoginFetchMethod = 'POST' as const
export type LoginFetch = FetchDefault<
  { phone: string; password: string },
  {
    id: number
    name: string
    email: string
    phone: string
    token: string
  },
  Record<string, never>,
  typeof LoginFetchMethod
>
