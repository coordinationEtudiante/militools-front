import type { FetchDefault } from '../FetchDefault.type'

export const getContactByIdMethod = 'GET' as const

export type ContactByIdField = {
  name: string
  value: string
  id: number
}

export type GetContactByIdResponse = {
  id: number
  createdAt: string
  fields: ContactByIdField[]
}

export type GetContactByIdQuery = {
  id: number | string
  fields: string
}

export type getContactByIdFetch = FetchDefault<
  Record<string, never>,
  GetContactByIdResponse,
  GetContactByIdQuery,
  typeof getContactByIdMethod
>
