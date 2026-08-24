import type { FetchDefault } from '../FetchDefault.type'

export const getContactStatsFetchMethod = 'POST' as const
export type getContactStatsFetch = FetchDefault<
  Record<string, never>,
  {
    contactCount: number
    valueCount: {
      name: string
      count: number
    }[]
    totalValue: number
  },
  { area: number },
  typeof getContactStatsFetchMethod
>
