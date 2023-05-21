import type { AxiosResponse } from 'axios';
import type { GetPathParams, Prettify } from '#/types/utils';

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

export function makeURLPath<T extends string>(url: T, paramsUrl: Prettify<GetPathParams<T>>): T {
  let finalUrl = url;

  for (const key in paramsUrl) {
    const value = paramsUrl[key as keyof typeof paramsUrl];
    finalUrl = finalUrl.replace(`:${key}`, value) as T;
  }

  return finalUrl;
}
