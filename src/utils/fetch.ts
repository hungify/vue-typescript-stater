import {
  $fetch,
  type FetchContext,
  type FetchError,
  type FetchOptions,
} from 'ofetch'
import type {
  ErrorResponse,
  MediaType,
  OperationRequestBodyContent,
  ResponseObjectMap,
  SuccessResponse,
} from 'openapi-typescript-helpers'

export type FetchResponseData<
  T,
  Media extends MediaType = MediaType,
> = SuccessResponse<ResponseObjectMap<T>, Media>

export type FetchResponseError<
  T,
  Media extends MediaType = MediaType,
> = FetchError<ErrorResponse<ResponseObjectMap<T>, Media>>

export type MethodOption<M, P> = 'get' extends keyof P
  ? { method?: M }
  : { method: M }

export type ParamsOption<T> = T extends { parameters?: any; query?: any }
  ? T['parameters']
  : Record<string, never>

export type RequestBodyOption<T> =
  OperationRequestBodyContent<T> extends never
    ? { body?: never }
    : undefined extends OperationRequestBodyContent<T>
      ? { body?: OperationRequestBodyContent<T> }
      : { body: OperationRequestBodyContent<T> }

export type FilterMethods<T> = {
  [K in keyof Omit<T, 'parameters'> as T[K] extends never | undefined
    ? never
    : K]: T[K]
}

export type OpenFetchOptions<
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
  RequestBodyOption<Operation> &
  Omit<FetchOptions, 'query' | 'body' | 'method'>

export type OpenFetchClient<Paths> = <
  ReqT extends Extract<keyof Paths, string>,
  Methods extends FilterMethods<Paths[ReqT]>,
  Method extends
    | Extract<keyof Methods, string>
    | Uppercase<Extract<keyof Methods, string>>,
  LowercasedMethod extends Lowercase<Method> extends keyof FilterMethods<
    Paths[ReqT]
  >
    ? Lowercase<Method>
    : never,
  DefaultMethod extends 'get' extends LowercasedMethod
    ? 'get'
    : LowercasedMethod,
  ResT = FetchResponseData<Paths[ReqT][DefaultMethod]>,
  ErrorT = FetchResponseError<Methods[DefaultMethod]>,
>(
  url: ReqT,
  options?: OpenFetchOptions<Method, LowercasedMethod, Methods>,
) => Promise<ResT | ErrorT>

// More flexible way to rewrite the request path,
// but has problems - https://github.com/unjs/ofetch/issues/319
export function openFetchRequestInterceptor(ctx: FetchContext) {
  ctx.request = fillPath(
    ctx.request as string,
    (ctx.options as { path: Record<string, string> }).path,
  )
}

export function createOpenFetch<Paths>(
  options: FetchOptions | ((options: FetchOptions) => FetchOptions),
): OpenFetchClient<Paths> {
  return (url: string, opts: any = {}) => {
    return $fetch(
      fillPath(url, opts?.path),
      typeof options === 'function'
        ? options(opts)
        : {
            ...options,
            ...opts,
          },
    )
  }
}

function fillPath(path: string, params: object = {}) {
  for (const [k, v] of Object.entries(params))
    path = path.replace(`{${k}}`, encodeURIComponent(String(v)))
  return path
}
