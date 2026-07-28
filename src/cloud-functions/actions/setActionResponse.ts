import { reactiveFetch } from '@/tools/fetch.utils'
import type { setActionResponse } from '@/types/cloud-functions/actions/setActionResponse.type'

export function setActionResponse(body: setActionResponse['req'], immediate = true) {
  return reactiveFetch(':area/action/respond', {
    body,
    immediate,
  })
}
