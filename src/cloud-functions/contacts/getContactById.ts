import { reactiveFetch } from '@/tools/fetch.utils'
import type { GetContactByIdQuery } from '@/types/cloud-functions/contacts/getContactById.type'

export function getContactById(query: GetContactByIdQuery) {
  return reactiveFetch(':area/contact/getContactById', {
    query,
    method: 'GET',
  })
}
