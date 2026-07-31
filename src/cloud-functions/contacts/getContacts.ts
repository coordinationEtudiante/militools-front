import { reactiveFetch } from '@/tools/fetch.utils'
import type { GetContactsQuery } from '@/types/cloud-functions/contacts/getContacts'

export interface GetContactOptions {
  filters?: { name: string; value: string }[]
  fields?: string[]
  limit?: number
  sort?: { field: 'id' | 'createdAt' | 'updatedAt'; desc?: boolean }[]
}

function buildQuery(options?: GetContactOptions): GetContactsQuery {
  if (!options) return {}

  const query: GetContactsQuery = {}

  if (options.filters?.length) {
    query.filters = options.filters.map((f) => `${f.name}:${f.value}`).join(',')
  }

  if (options.fields?.length) {
    query.fields = options.fields.join(',')
  }

  if (options.limit) {
    query.limit = options.limit.toString()
  }

  if (options.sort?.length) {
    query.sort = options.sort.map((s) => (s.desc ? '-' : '') + s.field).join(',')
  }

  return query
}

export function getContacts(options?: GetContactOptions, immediate = true) {
  return reactiveFetch(':area/contact/getContacts', {
    query: buildQuery(options),
    method: 'GET',
    immediate,
  })
}
