import type { FetchDefault } from '../FetchDefault.type'

export const FieldsNumberValueMethod = 'GET' as const

export type FieldsNumberValueResponse = {
  name: string
  count: number
}[]

export type FieldsNumberValueQuery = {
  field: string
}

export type FieldsNumberValueFetch = FetchDefault<
  Record<string, never>,
  FieldsNumberValueResponse,
  FieldsNumberValueQuery,
  typeof FieldsNumberValueMethod
>
