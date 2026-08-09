import type { FetchDefault } from '../FetchDefault.type'

export const createContactsMethod = 'POST' as const
export type createContactsFetch = FetchDefault<
  {
    data: { id: number; value: string }[][]
  },
  { created: number[]; errors: { index: number; message: string }[] },
  Record<string, never>,
  typeof createContactsMethod
>
