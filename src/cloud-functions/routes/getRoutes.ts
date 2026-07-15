import { reactiveFetch } from '@/tools/fetch.utils'
import type { FetchDefault } from '@/types/cloud-functions/FetchDefault.type'

export function getRoute<fetchType extends FetchDefault>(req: fetchType['query']) {
  return reactiveFetch('getRoute', req)
}
