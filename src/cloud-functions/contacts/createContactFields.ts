import { reactiveFetch } from '@/tools/fetch.utils'
import type { createContactFieldsFetch } from '@/types/cloud-functions/contacts/createContactFields.type'

export function createContactFields(
  data: createContactFieldsFetch['req'],
  immediate = true,
) {
  return reactiveFetch(':area/contact/createContactFields', {
    body: data,
    method: 'POST',
    immediate,
  })
}
