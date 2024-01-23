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

export function makePathParams<TUrl extends AllEndpoint>(
  url: TUrl,
  paramsUrl: ExtractPathParams<TUrl>,
): TUrl {
  let finalUrl = String(url)
  if (paramsUrl && Object.keys(paramsUrl).length > 0) {
    finalUrl = Object.entries<string>(paramsUrl).reduce<string>(
      (path, [key, value]) => path.replace(`[${key}]`, value),
      url,
    )
  }
  finalUrl = url.replace(/(\(|\)|\/?\[[^\\/]+\])/g, '')

  return finalUrl as TUrl
}

export const normalizePath = (url: string) => {
  return url.split('?')[0]
}
