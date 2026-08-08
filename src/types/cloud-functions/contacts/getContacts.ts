import type { FetchDefault } from '../FetchDefault.type'
export const getContactsMethod = 'GET' as const

export type ContactField = {
  name: string
  value: string
}

export type ContactResult = {
  id: number
  //manual add date. date is autoconvert on fetch
  createdAt: string | Date
  fields: ContactField[]
}

export type ContactFieldDefinition = {
  name: string
  type: string
}

export type GetContactsResponse = {
  credit: number
  regularCredit: number
  fields: ContactFieldDefinition[]
  value: ContactResult[]
  number: number
}

export type GetContactsQuery = {
  filters?: string
  fields?: string
  limit?: string
  offset?: string
  sort?: string
}

export type getContactsFetch = FetchDefault<
  Record<string, never>,
  GetContactsResponse,
  GetContactsQuery,
  typeof getContactsMethod
>
