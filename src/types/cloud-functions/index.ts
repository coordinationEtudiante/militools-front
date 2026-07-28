import { type createAction, createActionMethod } from './actions/create.type'
import { type listAction, listActionMethod } from './actions/list.type'
import { type setActionResponse, setActionResponseMethod } from './actions/setActionResponse.type'
import { type getAreaFetch, getAreaFetchMethod } from './areas/getArea.type'
import { type LoginFetch, LoginFetchMethod } from './auth/login.type'
import { type RegisterFetch, RegisterFetchMethod } from './auth/register.type'
import {
  type getContactFieldsFetch,
  getContactFieldsFetchMethod,
} from './contacts/getContactFields'
import { type createImage, createImageMethod } from './image/create.type'
import { type getPermFetch, getPermFetchMethod } from './perm/getPerm'
import { type getRouteFetch, getRouteFetchMethod } from './routes/getRoutes.type'

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

export const routeMethodMap = {
  ':area/action/create': createActionMethod,
  ':area/action/list': listActionMethod,
  ':area/action/respond': setActionResponseMethod,
  ':area/contact/getContactFields': getContactFieldsFetchMethod,
  ':area/image/create': createImageMethod,
  ':area/routes/getRoutes': getPermFetchMethod,
  '/areas/list': getAreaFetchMethod,
  'auth/login': LoginFetchMethod,
  'auth/register': RegisterFetchMethod,
  getRoute: getRouteFetchMethod,
} as const satisfies {
  [K in CloudFunctionRoute]: CloudFunctionDefinition<K>['method']
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

export type RouteMethodMap = typeof routeMethodMap
