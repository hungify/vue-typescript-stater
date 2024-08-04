import {
  type CreateFetchOptions,
  type UseFetchOptions,
  type UseFetchReturn,
  createFetch,
} from '@vueuse/core'
import { type MaybeRefOrGetter, toValue } from 'vue'
import {
  type FetchResponseData,
  type FilterMethods,
  type ParamsOption,
  type RequestBodyOption,
  createOpenFetch,
} from '#/utils/fetch'

type MethodOption<M, P> = 'get' extends keyof P ? { method?: M } : { method: M }

type UseOpenFetchOptions<
  Method,
  LowercasedMethod,
  Params,
  Operation = 'get' extends LowercasedMethod
    ? 'get' extends keyof Params
      ? Params['get']
      : never
    : LowercasedMethod extends keyof Params
      ? Params[LowercasedMethod]
      : never,
> = MethodOption<Method, Params> &
  ParamsOption<Operation> &
  RequestBodyOption<Operation>

export type UseOpenFetchClient<Paths> = <
  Path extends Extract<keyof Paths, string>,
  Methods extends FilterMethods<Paths[Path]>,
  Method extends
    | Extract<keyof Methods, string>
    | Uppercase<Extract<keyof Methods, string>>,
  LowercasedMethod extends Lowercase<Method> extends keyof Methods
    ? Lowercase<Method>
    : never,
  DefaultMethod extends 'get' extends LowercasedMethod
    ? 'get'
    : LowercasedMethod,
  ResT = FetchResponseData<Methods[DefaultMethod]>,
>(
  path: Path | (() => Path),
  options: UseOpenFetchOptions<Method, LowercasedMethod, Methods>,
  useFetchOptions?: UseFetchOptions,
) => UseFetchReturn<ResT> & PromiseLike<UseFetchReturn<ResT>>

export function createUseOpenFetch<Paths>(
  config: CreateFetchOptions,
): UseOpenFetchClient<Paths> {
  const useFetch = createFetch({
    ...config,
    options: {
      fetch: createOpenFetch({
        baseURL: toValue(config.baseUrl),
      }),
    },
  })

  return (
    url: MaybeRefOrGetter<string>,
    requests: any, //TODO: find a way to type this
    useFetchOptions?: UseFetchOptions,
  ) => {
    return useFetch(toValue(url), requests, useFetchOptions)
  }
}
