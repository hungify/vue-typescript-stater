import { isAxiosError } from 'axios'

export function toPromise<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((error: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, error, errorExt)

        return [parsedError, undefined]
      }
      if (isAxiosError(error)) return [error.response?.data, undefined]

      return [error, undefined]
    })
}
