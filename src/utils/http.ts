import type { ExtractPathParams } from '#/types/url'
import type { Prettify } from '#/types/utils'
import type { AxiosResponse } from 'axios'

/**
 * Type guard function to check whether a value is an AxiosResponse.
 *
 * @param value The value to check.
 * @returns True if the value is an AxiosResponse, false otherwise.
 */
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

/**
 * Constructs a URL path by replacing dynamic parameters in the given URL with their corresponding values.
 *
 * @template TUrl - The type of the URL path.
 * @param {TUrl} url - The base URL path.
 * @param {TUrl<ExtractPathParams<TUrl>>} paramsUrl - An object containing key-value pairs representing the dynamic parameters and their values.
 * @returns {TUrl} - The final URL path with dynamic parameters replaced.
 */
export function makePathParams<TUrl extends string>(
  url: TUrl,
  paramsUrl: Prettify<ExtractPathParams<TUrl>>
): TUrl {
  let finalUrl = url

  for (const key in paramsUrl) {
    const value = paramsUrl[key as keyof typeof paramsUrl] as string
    finalUrl = finalUrl.replace(`:${key}`, encodeURIComponent(value)) as TUrl
  }

  return finalUrl
}

/**
 * Extracts the normalized path from a given URL by removing the query string.
 * @param {string} url - The URL to normalize.
 * @returns {string} - The normalized path.
 */
export const normalizePath = (url: string) => {
  return url.split('?')[0]
}
