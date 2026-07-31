import type { FetchDefault } from '../FetchDefault.type'

export const getDuplicateMethod = 'POST' as const
export type getDuplicateFetch = FetchDefault<
  { data: { id: number; value: string }[][] },
  {
    duplicates: {
      index: number
      remoteIndex: number
      duplicateOf: {
        id: number
        name: string
        value: string
      }[]
    }[]
    nbDuplicate: number
  },
  Record<string, never>,
  typeof getDuplicateMethod
>
