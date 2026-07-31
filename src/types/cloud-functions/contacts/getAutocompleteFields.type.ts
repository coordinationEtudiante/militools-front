import type { FetchDefault } from '../FetchDefault.type'

export const getAutocompleteFieldsMethod = 'GET' as const

export type AutocompleteProposal = {
  output: string
  contactId: number
  primaryFields: { name: string; value: string }[]
}

export type GetAutocompleteFieldsResponse = {
  proposals: AutocompleteProposal[]
}

export type GetAutocompleteFieldsQuery = {
  field: string
  partial: string
}

export type getAutocompleteFieldsFetch = FetchDefault<
  Record<string, never>,
  GetAutocompleteFieldsResponse,
  GetAutocompleteFieldsQuery,
  typeof getAutocompleteFieldsMethod
>
