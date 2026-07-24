import type { FetchDefault } from '../FetchDefault.type'

export type getPermFetch = FetchDefault<
  Record<string, never>,
  {
    routes: {
      id: string
      name: string
      descKey: string
      descDefault: string
      method: 'GET' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'PUT' | 'DELETE' | 'POST' | 'PATCH' | 'CONNECT'
      path: string
      routes: string
      level: string | null
    }[]
    autorizedRoutes: {
      id: string
      routePermLevels: string | null
    }[]
  },
  Record<string, never>,
  'GET'
>
