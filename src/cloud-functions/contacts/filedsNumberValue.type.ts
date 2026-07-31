import { reactiveFetch } from '@/tools/fetch.utils'
import type { FieldsNumberValueQuery } from '@/types/cloud-functions/contacts/filedsNumberValue.type'

export function filedsNumberValue(query: FieldsNumberValueQuery) {
  return reactiveFetch(':area/contact/getfieldNumberValue', {
    query,
    method: 'GET',
  })
}
