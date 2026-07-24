import type { FetchDefault } from '../FetchDefault.type'

export type setActionResponse = FetchDefault<
  { actionId: number; awnser: boolean | null },
  Record<string, never>,
  Record<string, never>,
  'POST'
>
