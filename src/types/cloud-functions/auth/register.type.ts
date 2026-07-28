import type { FetchDefault } from '../FetchDefault.type'

export const RegisterFetchMethod = 'POST' as const
export type RegisterFetch = FetchDefault<
  { phone: string; password: string; name: string; email: string },
  {
    id: number
    name: string
    firstName: string
    email: string
    phone: string
  },
  Record<string, never>,
  typeof RegisterFetchMethod
>
