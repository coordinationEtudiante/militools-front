import type { FetchDefault } from '../FetchDefault.type'

export const setActionResponseMethod = 'POST' as const
export type setActionResponse = FetchDefault<
  { actionId: number; awnser: boolean | null },
  Record<string, never>,
  Record<string, never>,
  typeof setActionResponseMethod
>
