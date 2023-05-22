import type { GetPathParams, Prettify } from '#/types/utils';
import type { AxiosResponse } from 'axios';

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
  );
}

/**
 * Constructs a URL path by replacing dynamic parameters in the given URL with their corresponding values.
 *
 * @template TPath - The type of the URL path.
 * @param {TPath} url - The base URL path.
 * @param {Prettify<GetPathParams<TPath>>} paramsUrl - An object containing key-value pairs representing the dynamic parameters and their values.
 * @returns {TPath} - The final URL path with dynamic parameters replaced.
 */
export function makeURLPath<TPath extends string>(
  url: TPath,
  paramsUrl: Prettify<GetPathParams<TPath>>,
): TPath {
  let finalUrl = url;

  for (const key in paramsUrl) {
    const value = paramsUrl[key] as string;
    finalUrl = finalUrl.replace(`:${key}`, encodeURIComponent(value)) as TPath;
  }

  return finalUrl;
}
