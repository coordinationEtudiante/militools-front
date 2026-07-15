export type HttpMethod =
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'TRACE'
  | 'PUT'
  | 'DELETE'
  | 'POST'
  | 'PATCH'
  | 'CONNECT'

export type FetchDefault<
  Req extends Record<string, unknown> = Record<string, unknown>,
  Res extends Record<string, unknown> | Array<Record<string, unknown>> =
    | Record<string, unknown>
    | Array<Record<string, unknown>>,
  Query extends Record<string, unknown> = Record<string, never>,
  Method extends HttpMethod = HttpMethod,
> = {
  req: Req
  query: Query
  res: Res
  method: Method
}
