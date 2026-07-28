import type { FetchDefault } from '../FetchDefault.type'

export const getRouteFetchMethod = 'GET' as const
export type getRouteFetch = FetchDefault<
  Record<string, never>,
  {
    data: {
      routes: {
        id: string
        name: string
        descKey: string
        descDefault: string
        method:
          | 'GET'
          | 'HEAD'
          | 'OPTIONS'
          | 'TRACE'
          | 'PUT'
          | 'DELETE'
          | 'POST'
          | 'PATCH'
          | 'CONNECT'
        path: string
        routes: string
        level: string | null
      }[]
    }
    autorizedRoutes: {
      id: string
      routePermLevels: string | null
    }[]
  },
  { area: number },
  typeof getRouteFetchMethod
>
