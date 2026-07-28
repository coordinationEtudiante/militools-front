import { reactiveFetch } from '@/tools/fetch.utils'

export function getPerm(areaId?: number) {
  return reactiveFetch(':area/routes/getRoutes', {
    areaId,
    method: 'GET',
  })
}
