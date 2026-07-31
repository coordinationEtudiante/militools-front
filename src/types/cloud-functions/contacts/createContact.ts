import type { FetchDefault } from '../FetchDefault.type'

export const createContactMethod = 'POST' as const
export type createContact = FetchDefault<
  { data: { id: number; value: string }[] },
  { id: number },
  Record<string, never>,
  typeof createContactMethod
>
