import type { FetchDefault } from '../FetchDefault.type'
export const exportCSVMethod = 'GET' as const

export type ExportCSVQuery = {
  fields?: string
  inTrash?: string
}

export type exportCSVFetch = FetchDefault<
  Record<string, never>,
  Record<string, never>,
  ExportCSVQuery,
  typeof exportCSVMethod
>
