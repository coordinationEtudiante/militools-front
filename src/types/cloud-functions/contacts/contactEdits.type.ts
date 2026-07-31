import type { FetchDefault } from '../FetchDefault.type'

export const editContactMethod = 'POST' as const
export type editContactFetch = FetchDefault<
  { data: { contactId: number; data: Array<{ id: number; value: string }> }[] },
  {
    updated: number[]
    errors: {
      index: number
      message: string
    }[]
  },
  Record<string, never>,
  typeof editContactMethod
>
