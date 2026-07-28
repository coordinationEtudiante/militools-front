import { reactiveFetch } from '@/tools/fetch.utils'
import type { createAction } from '@/types/cloud-functions/actions/create.type'

export function createAction(data: createAction['req'], immediate = true) {
  return reactiveFetch(':area/action/create', { body: data, immediate })
}
