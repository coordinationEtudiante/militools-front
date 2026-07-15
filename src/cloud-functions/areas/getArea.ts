import { reactiveFetch } from '@/tools/fetch.utils'

export function getArea() {
  return reactiveFetch('/areas/list')
}
