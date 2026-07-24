import { reactiveFetch } from '@/tools/fetch.utils'

export function listAction() {
  return reactiveFetch(':area/action/list')
}
