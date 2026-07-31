import { reactiveFetch } from '@/tools/fetch.utils'
import type { createContactsFetch } from '@/types/cloud-functions/contacts/createContacts.type'

export function createContacts(
  data: createContactsFetch['req'],
  immediate = true,
) {
  return reactiveFetch(':area/contact/creates', {
    body: data,
    method: 'POST',
    immediate,
  })
}
