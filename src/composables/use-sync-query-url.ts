import { useDebounceFn } from '@vueuse/core'
import { withQuery } from 'ufo'
import type { RouteNamedMap } from 'vue-router/auto/routes'

interface UseSyncQueryUrlOptions {
  path: keyof RouteNamedMap
  timeout?: number
}

interface UseSyncQueryUrlReturn<QueryKeys extends string> {
  onSyncQueryUrl: <
    T extends {
      [key in QueryKeys]?: string | number | undefined
    },
    method extends 'replace' | 'push' = 'replace',
  >(
    queryObj: T,
    method?: method,
  ) => void

  onSyncQueryUrlWithDebounce: <
    T extends {
      [key in QueryKeys]?: string | number | undefined
    },
    method extends 'replace' | 'push' = 'replace',
  >(
    queryObj: T,
    method?: method,
  ) => void
}

export function useSyncQueryUrl<QueryKeys extends string>(
  path: keyof RouteNamedMap,
): UseSyncQueryUrlReturn<QueryKeys>
export function useSyncQueryUrl<QueryKeys extends string>(
  args: keyof RouteNamedMap | UseSyncQueryUrlOptions,
): UseSyncQueryUrlReturn<QueryKeys> {
  const { path, timeout } =
    typeof args === 'string' ? { path: args, timeout: 500 } : args

  const route = useRoute(path)
  const router = useRouter()

  const onSyncQueryUrl = <
    T extends { [key in QueryKeys]?: string | number | undefined },
  >(
    queryObj: T,
    method: 'replace' | 'push' = 'replace',
  ) => {
    const query = {
      ...route.query,
      ...Object.keys(queryObj).reduce((acc, key) => {
        const value = queryObj[key as keyof T]

        return {
          ...acc,
          [key]: value === undefined ? undefined : value,
        }
      }, {}),
    }

    router[method](withQuery(route.path, query))
  }

  const onSyncQueryUrlWithDebounce = useDebounceFn(
    <T extends { [key in QueryKeys]?: string | number | undefined }>(
      queryObj: T,
      method: 'replace' | 'push' = 'replace',
    ) => {
      onSyncQueryUrl(queryObj, method)
    },
    timeout,
  )

  return { onSyncQueryUrl, onSyncQueryUrlWithDebounce }
}
