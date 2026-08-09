import { reactiveFetch } from '@/tools/fetch.utils'

export function createContact(body: { id: number; value: string }[]) {
  return reactiveFetch(':area/contact/create', {
    body: { data: body },
    method: 'POST',
  })
}
