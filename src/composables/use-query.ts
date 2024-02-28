import { type Stoppable, createEventHook, useTimeoutFn } from '@vueuse/core'
import type { paths } from '#/generated/api-schema'
import type { FetchResponse, MaybeOptionalInit } from 'openapi-fetch'
import type { PathsWithMethod } from 'openapi-typescript-helpers'
import { client } from '#/api/client'

interface UseFetchOptions {
  /**
   * Initial data before the request finished
   *
   * @default null
   */
  initialData?: any

  /**
   * Timeout for abort request after number of millisecond
   * `0` means use browser default
   *
   * @default 0
   */
  timeout?: number

  /**
   * Allow update the `data` ref when fetch error whenever provided, or mutated in the `onFetchError` callback
   *
   * @default false
   */
  updateDataOnError?: boolean
}

interface QueryParams<P> {
  /**
   * Path to fetch
   * @example '/users'
   *
   */
  path: P

  /**
   * Fetch options
   */
  fetchOptions?: UseFetchOptions
}

export function useQuery<P extends PathsWithMethod<paths, 'get'>>(
  queryParams: QueryParams<P>,
) {
  const supportsAbort = typeof AbortController === 'function'

  const { path, fetchOptions = {} } = queryParams

  let requestOptions: RequestInit = {}

  const options: UseFetchOptions = {
    timeout: 0,
    updateDataOnError: false,
    ...fetchOptions,
  }

  const { initialData, timeout } = options

  // Event Hooks
  const responseEvent = createEventHook<Response>()
  const errorEvent = createEventHook<any>()
  const finallyEvent = createEventHook<any>()

  const isFinished = ref(false)
  const isFetching = ref(false)
  const aborted = ref(false)
  const response = shallowRef<Response | null>(null)
  const error = shallowRef<any>(null)

  const data = shallowRef<
    FetchResponse<paths[P]['get'], undefined>['data'] | null
  >(initialData || null)

  const canAbort = computed(() => supportsAbort && isFetching.value)

  let controller: AbortController | undefined
  let timer: Stoppable | undefined

  const abort = () => {
    if (supportsAbort) {
      controller?.abort()
      controller = new AbortController()
      controller.signal.addEventListener('abort', () => (aborted.value = true))
      requestOptions = {
        ...requestOptions,
        signal: controller.signal,
      }
    }
  }

  const loading = (isLoading: boolean) => {
    isFetching.value = isLoading
    isFinished.value = !isLoading
  }

  if (timeout) timer = useTimeoutFn(abort, timeout, { immediate: false })

  let executeCounter = 0

  const execute = (...args: MaybeOptionalInit<paths[P], 'get'>) => {
    abort()
    loading(true)
    error.value = null
    aborted.value = false

    executeCounter += 1

    const currentExecuteCounter = executeCounter

    const isCanceled = false

    if (isCanceled) {
      loading(false)

      return Promise.resolve(null)
    }

    if (timer) timer.start()

    // It's hard to type this part, so I just use `as unknown as` to bypass the type check
    const queryParams = [
      { ...args[0], ...requestOptions },
    ] as unknown as MaybeOptionalInit<paths[P], 'get'>

    return client.GET(path, ...queryParams).then((fetchResponse) => {
      if (timer) timer.stop()

      if (currentExecuteCounter === executeCounter) loading(false)
      finallyEvent.trigger(null)

      if (fetchResponse.data) {
        response.value = fetchResponse.response
        data.value = fetchResponse.data

        responseEvent.trigger(fetchResponse.response)

        return fetchResponse
      }
      if (fetchResponse.error) {
        data.value = initialData || null
        error.value = fetchResponse.error
        if (options.updateDataOnError) errorEvent.trigger(fetchResponse.error)

        return null
      }
    })
  }

  return {
    isFinished: readonly(isFinished),
    isFetching: readonly(isFetching),
    error,
    canAbort,
    aborted,
    abort,
    data,
    statusCode: computed(() => response.value?.status),

    onFetchResponse: responseEvent.on,
    onFetchError: errorEvent.on,
    onFetchFinally: finallyEvent.on,

    execute,
  }
}
