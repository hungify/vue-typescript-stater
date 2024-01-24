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

export function makePathParams<const Endpoint extends AllEndpoint>(
  ...args: ExtractPathParams<Endpoint> extends never
    ? [
        {
          endpoint: Endpoint
        },
      ]
    : [{ endpoint: Endpoint; params: ExtractPathParams<Endpoint> }]
) {
  const { endpoint } = args[0]
  let url = String(endpoint.split(' ')[1])
  if ('params' in args[0]) {
    const { params } = args[0]
    if (params && Object.keys(params).length > 0) {
      url = Object.entries(params).reduce(
        (path, [key, value]) =>
          path.replaceAll(
            new RegExp(`\\[${key}:${typeof value}\\]`, 'g'),
            encodeURIComponent(String(value)),
          ),
        url,
      )
    }
  }
  url = url.replaceAll(/(\(|\)|\/?\[[^/]+])/g, '')
  return url as Endpoint
}

export const normalizePath = (endpoint: AllEndpoint) => {
  const endpoints = endpoint.split(' ')
  return endpoints.length === 2 ? endpoints[1].split('?')[0] : endpoints[0]
}
