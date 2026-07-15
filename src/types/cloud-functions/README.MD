# fetchResource Type Definitions

## Overview

The `fetchResource` function retrieves data from a cloud function endpoint, which serves as the entry point to external API endpoints. It's implemented in `src/tools/cloud-functions/fetch.utils.ts`.

## Type Hierarchy

The types form a hierarchical structure that helps define what kind of request and response can be expected.

```ts
export type CloudFunctionRouteMap = {
  login: LoginFetch
}
```

### Key Components

The **method** in a route determines the HTTP request type (GET, POST, etc.), which is used to determine whether to send or receive bodies.

## Create a New Route

To create a new route for fetchResource, you need to:

- **Create a new TypeScript file** in the `src/types/cloud-functions/` directory. A good name would be `[your-route-name].type.ts`.
- **Export your route as a type** using one of the export statements:
  - For simple routes, use `export type [RouteName] = Type;`
  - For more complex types, you can export it from `login.type.ts` or a separate file.
- **Export the route map** from [index.ts](src/types/cloud-functions/index.ts) by adding a new entry:
  `export type CloudFunctionRouteMap = { your-route-name: YourTypeDefinition }`

## Example Implementation

A typical route definition looks like this:

```ts
export type [YourRouteName] = {
  method: HttpMethod
  req: YourRequestType
  query?: YourQueryStringType
  res: YourResponseType
}

export type YourMethod = HttpMethod
export type YourRequest = YourRequestType
export type YourQueryString = YourQueryStringType
export type YourResponse = YourResponseType
```

You'll then need to import this type from the main [index.ts](src/types/cloud-functions/index.ts) file and add it to the CloudFunctionRouteMap.

## Common HttpMethod Values

The possible methods are:

- `GET`
- `HEAD`
- `OPTIONS`
- `TRACE`
- `PUT`
- `DELETE`
- `POST`
- `PATCH`
- `CONNECT`

The method is automatically inferred from whether there's a body or not. If you're sending data, use POST or PATCH; for reading responses, use GET, HEAD, OPTIONS, TRACE.
