import { reactiveFetch } from '@/tools/fetch.utils'

export function listAction(granularity: 'day' | 'week' | 'month' | 'year' | 'custom' = 'week') {
  return reactiveFetch(':area/action/list', { query: { granularity } })
}
