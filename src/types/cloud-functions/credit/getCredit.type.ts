import type { FetchDefault } from '../FetchDefault.type'

export const getCreditFetchMethod = 'GET' as const
export type getCreditFetch = FetchDefault<
  Record<string, never>,
  {
    dayCredit: number
    consumedCredit: number
    acceptedExtraCredit: number
    pendingExtraCredits: number
    rejectedExtraCredits: number
  },
  { area: number },
  typeof getCreditFetchMethod
>
