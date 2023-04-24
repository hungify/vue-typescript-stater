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
