import { reactiveFetch } from '@/tools/fetch.utils'
import type { editContactFetch } from '@/types/cloud-functions/contacts/editContact.type'

export function editContact(
  contactId: number,
  data: editContactFetch['req']['data'],
  immediate = true,
) {
  return reactiveFetch(':area/contact/edit', {
    body: { contactId, data },
    method: 'POST',
    immediate,
  })
}
