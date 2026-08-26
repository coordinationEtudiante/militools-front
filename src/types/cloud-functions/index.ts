import { type createAction, createActionMethod } from './actions/create.type'
import { type listAction, listActionMethod } from './actions/list.type'
import { type setActionResponse, setActionResponseMethod } from './actions/setActionResponse.type'
import { type getAreaFetch, getAreaFetchMethod } from './areas/getArea.type'
import { type LoginFetch, LoginFetchMethod } from './auth/login.type'
import { type RegisterFetch, RegisterFetchMethod } from './auth/register.type'
import { type TestTokenFetch, TestTokenFetchMethod } from './auth/testToken.type'
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
import { getCreditFetchMethod, type getCreditFetch } from './credit/getCredit.type'
import { type createImage, createImageMethod } from './image/create.type'
import { type getPermFetch, getPermFetchMethod } from './perm/getPerm'
import { type getRouteFetch, getRouteFetchMethod } from './routes/getRoutes.type'
import { getContactStatsFetchMethod, type getContactStatsFetch } from './stats/contactStats.type'

export type CloudFunctionRouteMap = {
  ':area/action/create': createAction
  ':area/action/list': listAction
  ':area/action/respond': setActionResponse
  ':area/contact/create': createContact
  ':area/contact/createContactFields': createContactFieldsFetch
  ':area/contact/creates': createContactsFetch
  ':area/contact/edits': editContactFetch
  ':area/contact/getAutocompleteFields': getAutocompleteFieldsFetch
  ':area/contact/getContactById': getContactByIdFetch
  ':area/contact/getContactFields': getContactFieldsFetch
  ':area/contact/getContacts': getContactsFetch
  ':area/contact/getCredit': getCreditFetch
  ':area/contact/getDuplicate': getDuplicateFetch
  ':area/contact/getfieldNumberValue': FieldsNumberValueFetch
  ':area/image/create': createImage
  ':area/routes/getRoutes': getPermFetch
  ':area/stats/contactStats': getContactStatsFetch
  '/areas/list': getAreaFetch
  'auth/login': LoginFetch
  'auth/register': RegisterFetch
  'auth/testToken': TestTokenFetch
  getRoute: getRouteFetch
}

export const routeMethodMap = {
  ':area/action/create': createActionMethod,
  ':area/action/list': listActionMethod,
  ':area/action/respond': setActionResponseMethod,
  ':area/contact/create': createContactMethod,
  ':area/contact/createContactFields': createContactFieldsMethod,
  ':area/contact/creates': createContactsMethod,
  ':area/contact/edits': editContactMethod,
  ':area/contact/getAutocompleteFields': getAutocompleteFieldsMethod,
  ':area/contact/getContactById': getContactByIdMethod,
  ':area/contact/getContactFields': getContactFieldsFetchMethod,
  ':area/contact/getContacts': getContactsMethod,
  ':area/contact/getCredit': getCreditFetchMethod,
  ':area/contact/getDuplicate': getDuplicateMethod,
  ':area/contact/getfieldNumberValue': FieldsNumberValueMethod,
  ':area/image/create': createImageMethod,
  ':area/routes/getRoutes': getPermFetchMethod,
  ':area/stats/contactStats': getContactStatsFetchMethod,
  '/areas/list': getAreaFetchMethod,
  'auth/login': LoginFetchMethod,
  'auth/register': RegisterFetchMethod,
  'auth/testToken': TestTokenFetchMethod,
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
