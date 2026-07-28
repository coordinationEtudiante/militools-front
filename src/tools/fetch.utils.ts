import { fetchError } from '@/errors/fetch.error'
import { useAreaStore } from '@/stores/area.store'
import { useServerStore } from '@/stores/server.store'
import { useUserStore } from '@/stores/user.store'
import {
  routeMethodMap,
  type CloudFunctionMethod,
  type CloudFunctionQuery,
  type CloudFunctionRequest,
  type CloudFunctionResponse,
  type CloudFunctionRoute,
} from '@/types/cloud-functions'
import { ref } from 'vue'

export function getBaseUrl() {
  const serverStore = useServerStore()
  return serverStore.baseUrl || window.location.origin
}

function getAreaId() {
  const serverStore = useAreaStore()
  return serverStore.getArea().id
}

function getToken() {
  const { token } = useUserStore()
  return token
}

function getDefaultOptions(): RequestInit {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: 'same-origin',
  }
}

export async function fetchRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const defaultOptions = getDefaultOptions()
    const requestOptions: RequestInit = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options?.headers,
      },
    }

    if (requestOptions.body instanceof FormData) {
      const h = { ...(requestOptions.headers as Record<string, string>) }
      delete h['Content-Type']
      delete h['content-type']
      requestOptions.headers = h
    }

    if (endpoint.includes(':area')) endpoint = endpoint.replace(':area', getAreaId().toString())

    const response = await fetch(new URL(`${endpoint}`, getBaseUrl()), requestOptions)

    if (!response.ok) {
      throw new fetchError(response.statusText, {
        status: response.status || 400,
      })
    }

    const responseText = await response.text()
    const data = responseText ? (JSON.parse(responseText).data as T) : undefined

    return data as T
  } catch (err) {
    if (err instanceof fetchError) {
      throw err
    }

    throw new fetchError(err instanceof Error ? err.message : 'Unexpected request error', {
      status: 400,
    })
  }
}

type FetchResourceOptions<TRoute extends CloudFunctionRoute> = Omit<
  RequestInit,
  'body' | 'method'
> & {
  body?: CloudFunctionRequest<TRoute> | FormData
  query?: CloudFunctionQuery<TRoute>
  method?: CloudFunctionMethod<TRoute>
  areaId?: number
  immediate?: boolean
}

function buildQueryString(query?: Record<string, unknown>): string {
  if (!query) {
    return ''
  }

  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) {
      continue
    }

    params.append(key, value instanceof Date ? value.toISOString() : String(value))
  }

  const serialized = params.toString()
  return serialized ? `?${serialized}` : ''
}

export async function fetchResource<TRoute extends CloudFunctionRoute>(
  route: TRoute,
  options: FetchResourceOptions<TRoute> = {},
): Promise<CloudFunctionResponse<TRoute>> {
  const { body, query, method, areaId, headers, ...requestOptions } = options
  const resolvedMethod = method ?? (body ? 'POST' : routeMethodMap[route])
  console.log(route, method)
  const resolvedRoute = route.includes(':area')
    ? route.replace(':area', (areaId ?? getAreaId()).toString())
    : route

  const isFormData = body instanceof FormData

  return fetchRequest<CloudFunctionResponse<TRoute>>(`${resolvedRoute}${buildQueryString(query)}`, {
    ...requestOptions,
    method: resolvedMethod,
    headers: isFormData ? { Authorization: `Bearer ${getToken()}` } : headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  })
}

export function reactiveFetch<TRoute extends CloudFunctionRoute>(
  route: TRoute,
  options: FetchResourceOptions<TRoute> = {},
) {
  const data = ref<CloudFunctionResponse<TRoute>>()
  const error = ref<fetchError>()
  const loadingPromise = ref()
  const isLoading = ref(false)
  const errorCode = ref<number | undefined>()

  const { body, query, method, areaId, headers, immediate = true, ...requestOptions } = options

  const isFormData = body instanceof FormData
  const resolvedMethod = method ?? routeMethodMap[route]
  const resolvedRoute = route.includes(':area')
    ? route.replace(':area', (areaId ?? getAreaId()).toString())
    : route
  const doFetch = () => {
    error.value = undefined
    errorCode.value = undefined
    isLoading.value = true
    loadingPromise.value = fetchRequest<CloudFunctionResponse<TRoute>>(
      `${resolvedRoute}${buildQueryString(query)}`,
      {
        ...requestOptions,
        method: resolvedMethod,
        headers: isFormData ? { Authorization: `Bearer ${getToken()}` } : headers,
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      },
    )
      .then((json) => (data.value = json))
      .catch((err) => {
        console.log(err)
        error.value = err instanceof fetchError ? err : new fetchError('Unexpected request error')
        errorCode.value = error.value.status ?? 400
      })
      .finally(() => (isLoading.value = false))
    return loadingPromise.value
  }
  if (immediate) {
    doFetch()
  }
  return { data, error, loadingPromise, isLoading, errorCode, doFetch }
}
