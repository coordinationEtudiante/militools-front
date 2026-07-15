import type { getAreaFetch } from './areas/getArea.type'
import type { LoginFetch } from './auth/login.type'
import type { RegisterFetch } from './auth/register.type'
import type { getContactFieldsFetch } from './contacts/getContactFields'
import type { getRouteFetch } from './routes/getRoutes.type'

export type CloudFunctionRouteMap = {
  'auth/login': LoginFetch
  'auth/register': RegisterFetch
  ':area/contact/getContactFields': getContactFieldsFetch
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
