import type { FetchDefault } from '../FetchDefault.type'

export const editContactsMethod = 'POST' as const
export type editContactsFetch = FetchDefault<
  { data: { contactId: number; data: Array<{ id: number; value: string }> }[] },
  {
    updated: number[]
    errors: {
      index: number
      message: string
    }[]
  },
  Record<string, never>,
  typeof editContactsMethod
>
