import type { createAction } from './actions/create.type'
import type { listAction } from './actions/list.type'
import type { setActionResponse } from './actions/setActionResponse.type'
import type { getAreaFetch } from './areas/getArea.type'
import type { LoginFetch } from './auth/login.type'
import type { RegisterFetch } from './auth/register.type'
import type { getContactFieldsFetch } from './contacts/getContactFields'
import type { createImage } from './image/create.type'
import type { getPermFetch } from './perm/getPerm'
import type { getRouteFetch } from './routes/getRoutes.type'

export type CloudFunctionRouteMap = {
  ':area/action/create': createAction
  ':area/action/list': listAction
  ':area/action/respond': setActionResponse
  ':area/contact/getContactFields': getContactFieldsFetch
  ':area/image/create': createImage
  ':area/routes/getRoutes': getPermFetch
  '/areas/list': getAreaFetch
  'auth/login': LoginFetch
  'auth/register': RegisterFetch
  getRoute: getRouteFetch
}

export type CloudFunctionRoute = keyof CloudFunctionRouteMap

export type CloudFunctionDefinition<TRoute extends CloudFunctionRoute> =
  CloudFunctionRouteMap[TRoute]

export type CloudFunctionRequest<TRoute extends CloudFunctionRoute> =
  CloudFunctionDefinition<TRoute>['req']

export type CloudFunctionResponse<TRoute extends CloudFunctionRoute> =
  CloudFunctionDefinition<TRoute>['res']

export type CloudFunctionQuery<TRoute extends CloudFunctionRoute> =
  CloudFunctionDefinition<TRoute>['query']

export type CloudFunctionMethod<TRoute extends CloudFunctionRoute> =
  CloudFunctionDefinition<TRoute>['method']

// This is a runtime object (value) typed from the route definitions.
// It's initialized as an empty object and asserted to the mapped type so
// its shape is enforced by TypeScript while remaining a value at runtime.
export const routeMethodMap = {} as {
  [K in CloudFunctionRoute]: CloudFunctionDefinition<K>['method']
}

export type RouteMethodMap = typeof routeMethodMap
