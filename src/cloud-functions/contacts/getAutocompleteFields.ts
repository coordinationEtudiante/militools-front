import { reactiveFetch } from '@/tools/fetch.utils'
import type { GetAutocompleteFieldsQuery } from '@/types/cloud-functions/contacts/getAutocompleteFields.type'

export function getAutocompleteFields(query: GetAutocompleteFieldsQuery) {
  return reactiveFetch(':area/contact/getAutocompleteFields', {
    query,
    method: 'GET',
  })
}
