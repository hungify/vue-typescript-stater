import { isAxiosError } from 'axios'

export function toPromise<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt)

        return [parsedError, undefined]
      }
      if (isAxiosError(err)) return [err.response?.data, undefined]

      return [err, undefined]
    })
}
