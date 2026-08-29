import { reactiveFetch } from '@/tools/fetch.utils'

export function createContact(body: { id: number; value: string }[], immediate = true) {
  return reactiveFetch(':area/contact/create', {
    body: { data: body },
    method: 'POST',
    immediate,
  })
}
