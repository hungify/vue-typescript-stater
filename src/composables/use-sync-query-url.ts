import { useDebounceFn } from '@vueuse/core'
import { withQuery } from 'ufo'
import type { RouteNamedMap } from 'vue-router/auto/routes'

interface UseSyncQueryUrlOptions {
  path: keyof RouteNamedMap
  timeout?: number
}

interface UseSyncQueryUrlReturn<QueryKeys extends string> {
  handleSyncQueryUrl: <
    T extends {
      [key in QueryKeys]?: string | number | undefined
    },
  >(
    queryObj: T,
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

  const handleSyncQueryUrl = useDebounceFn(
    <T extends { [key in QueryKeys]?: string | number | undefined }>(
      queryObj: T,
    ) => {
      const query = {
        ...route.query,
        ...queryObj,
      }

      router.replace(withQuery(route.path, query))
    },
    timeout,
  )

  return { handleSyncQueryUrl }
}
