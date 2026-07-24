import type { listAction } from './actions/list.type'
import type { setActionResponse } from './actions/setActionResponse.type'
import type { getAreaFetch } from './areas/getArea.type'
import type { LoginFetch } from './auth/login.type'
import type { RegisterFetch } from './auth/register.type'
import type { getContactFieldsFetch } from './contacts/getContactFields'
import type { getPermFetch } from './perm/getPerm'
import type { getRouteFetch } from './routes/getRoutes.type'

export type CloudFunctionRouteMap = {
  'auth/login': LoginFetch
  'auth/register': RegisterFetch
  ':area/contact/getContactFields': getContactFieldsFetch
  ':area/routes/getRoutes': getPermFetch
  ':area/action/list': listAction
  ':area/action/respond': setActionResponse
  '/areas/list': getAreaFetch
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

export type RouteMethodMap = {
  [K in CloudFunctionRoute]: CloudFunctionDefinition<K>['method']
}
