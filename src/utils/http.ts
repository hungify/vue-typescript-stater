import type { AllEndpoint } from '#/types/endpoints'
import type { ExtractPathParams } from '#/types/url'
import type { AxiosResponse } from 'axios'

export function isAxiosResponse<T>(value: unknown): value is AxiosResponse<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'data' in value &&
    'status' in value &&
    'statusText' in value &&
    'headers' in value &&
    'config' in value
  )
}

export function makePathParams<Endpoint extends AllEndpoint>(
  endpoint: Endpoint,
  params: ExtractPathParams<Endpoint>,
): Endpoint {
  let url = String(endpoint.split(' ')[1])

  if (params && Object.keys(params).length > 0) {
    url = Object.entries(params).reduce(
      (path, [key, value]) =>
        path.replaceAll(
          new RegExp(`\\[${key}:${typeof value}\\]`, 'g'),
          String(value),
        ),
      url,
    )
  }

  url = url.replaceAll(/(\(|\)|\/?\[[^/]+])/g, '')

  return url as Endpoint
}

export const normalizePath = (endpoint: AllEndpoint) => {
  const endpoints = endpoint.split(' ')
  return endpoints.length === 2 ? endpoints[1].split('?')[0] : endpoints[0]
}
