import type { FetchDefault } from '../FetchDefault.type'

export const editContactMethod = 'POST' as const

export type editContactFetch = FetchDefault<
  { contactId: number; data: { id: number; value: string }[] },
  { ok: boolean; message: string },
  Record<string, never>,
  typeof editContactMethod
>
