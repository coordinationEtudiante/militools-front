import { reactiveFetch } from '@/tools/fetch.utils'

export function getContactFields(areaId?: number) {
  return reactiveFetch(':area/contact/getContactFields', {
    areaId,
    method: 'GET',
  })
}
