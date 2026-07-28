import type { FetchDefault } from '../FetchDefault.type'

export const getAreaFetchMethod = 'POST' as const
export type getAreaFetch = FetchDefault<
  Record<string, never>,
  {
    id: number
    name: string | null
    location: {
      x: number
      y: number
    }
    locationName: string | null
    description: string | null
    creationDate: string
    searchCredit: number
  }[],
  Record<string, never>,
  typeof getAreaFetchMethod
>

export type getArea_fetch = getAreaFetch
