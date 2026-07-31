import { type createAction, createActionMethod } from './actions/create.type'
import { type listAction, listActionMethod } from './actions/list.type'
import { type setActionResponse, setActionResponseMethod } from './actions/setActionResponse.type'
import { type getAreaFetch, getAreaFetchMethod } from './areas/getArea.type'
import { type LoginFetch, LoginFetchMethod } from './auth/login.type'
import { type RegisterFetch, RegisterFetchMethod } from './auth/register.type'
import { editContactMethod, type editContactFetch } from './contacts/contactEdits.type'
import { type createContact, createContactMethod } from './contacts/createContact'
import {
  type createContactFieldsFetch,
  createContactFieldsMethod,
} from './contacts/createContactFields.type'
import { type createContactsFetch, createContactsMethod } from './contacts/createContacts.type'
import {
  type FieldsNumberValueFetch,
  FieldsNumberValueMethod,
} from './contacts/filedsNumberValue.type'
import {
  type getAutocompleteFieldsFetch,
  getAutocompleteFieldsMethod,
} from './contacts/getAutocompleteFields.type'
import { type getContactByIdFetch, getContactByIdMethod } from './contacts/getContactById.type'
import {
  type getContactFieldsFetch,
  getContactFieldsFetchMethod,
} from './contacts/getContactFields'
import { type getContactsFetch, getContactsMethod } from './contacts/getContacts'
import { getDuplicateMethod, type getDuplicateFetch } from './contacts/getDuplicate.type'
import { type createImage, createImageMethod } from './image/create.type'
import { type getPermFetch, getPermFetchMethod } from './perm/getPerm'
import { type getRouteFetch, getRouteFetchMethod } from './routes/getRoutes.type'

export type CloudFunctionRouteMap = {
  ':area/action/create': createAction
  ':area/action/list': listAction
  ':area/action/respond': setActionResponse
  ':area/contact/create': createContact
  ':area/contact/createContactFields': createContactFieldsFetch
  ':area/contact/creates': createContactsFetch
  ':area/contact/getAutocompleteFields': getAutocompleteFieldsFetch
  ':area/contact/getContactById': getContactByIdFetch
  ':area/contact/getContactFields': getContactFieldsFetch
  ':area/contact/getContacts': getContactsFetch
  ':area/contact/getDuplicate': getDuplicateFetch
  ':area/image/create': createImage
  ':area/contact/edits': editContactFetch
  ':area/routes/getRoutes': getPermFetch
  ':area/contact/getfieldNumberValue': FieldsNumberValueFetch
  '/areas/list': getAreaFetch
  'auth/login': LoginFetch
  'auth/register': RegisterFetch
  getRoute: getRouteFetch
}

export const routeMethodMap = {
  ':area/action/create': createActionMethod,
  ':area/action/list': listActionMethod,
  ':area/action/respond': setActionResponseMethod,
  ':area/contact/create': createContactMethod,
  ':area/contact/createContactFields': createContactFieldsMethod,
  ':area/contact/creates': createContactsMethod,
  ':area/contact/getAutocompleteFields': getAutocompleteFieldsMethod,
  ':area/contact/getContactById': getContactByIdMethod,
  ':area/contact/getContactFields': getContactFieldsFetchMethod,
  ':area/contact/getContacts': getContactsMethod,
  ':area/contact/getDuplicate': getDuplicateMethod,
  ':area/image/create': createImageMethod,
  ':area/contact/edits': editContactMethod,
  ':area/routes/getRoutes': getPermFetchMethod,
  ':area/contact/getfieldNumberValue': FieldsNumberValueMethod,
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
