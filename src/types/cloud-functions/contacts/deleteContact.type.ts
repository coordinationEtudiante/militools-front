import type { FetchDefault } from '../FetchDefault.type'

export const deleteContactMethod = 'POST' as const

export type deleteContactFetch = FetchDefault<
  Record<string, never>,
  { deleted: number },
  { contactId: number },
  typeof deleteContactMethod
>
