import type { FetchDefault } from '../FetchDefault.type'

export const TestTokenFetchMethod = 'GET' as const
export type TestTokenFetch = FetchDefault<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  typeof TestTokenFetchMethod
>
