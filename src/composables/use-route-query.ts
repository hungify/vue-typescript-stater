import { type PromisifyFn, useDebounceFn, watchPausable } from '@vueuse/core'
import { type ParsedQuery, getQuery } from 'ufo'
import type { RouteNamedMap } from 'vue-router/auto/routes'
import type { UnwrapRef } from 'vue'

type FnRouteQuery<T extends NonNullable<unknown>> = {
  [P in keyof T]: () => NonNullable<T[P]>
}

type UseRouteQueryArgs = {
  ms?: number
  name: keyof RouteNamedMap
  method?: 'replace' | 'push'
}

export const useRouteQuery = <T extends ParsedQuery>({
  name,
  ms = 0,
  method = 'replace',
}: UseRouteQueryArgs) => {
  const route = useRoute(name)
  const router = useRouter()
  const routeQuery = ref(getQuery<T>(route.fullPath))

  const fnRouteQuery = computed(() => {
    return objectKeys(routeQuery.value).reduce<FnRouteQuery<T>>(
      (acc, key) => ({
        ...acc,
        [key]: () => routeQuery.value[key]?.toString(),
      }),
      {} as FnRouteQuery<T>,
    )
  })

  const { pause, resume } = watchPausable(
    routeQuery,
    (newRouteQuery) => {
      router[method]({
        query: newRouteQuery,
      })
    },
    {
      deep: true,
      immediate: true,
    },
  )

  const reset = () => {
    routeQuery.value = getQuery<T>(route.path) as unknown as UnwrapRef<T>
  }

  const debounce = useDebounceFn(
    async <Q extends T>(
      queryObj: Q,
      method: 'replace' | 'push' = 'replace',
    ) => {
      pause()
      router[method]({
        query: queryObj,
      })
      routeQuery.value = queryObj as unknown as UnwrapRef<T>
      await nextTick()
      resume()
    },
    ms,
  ) satisfies PromisifyFn<<Q extends T>(queryObj: Q) => void>

  return {
    routeQuery,
    fnRouteQuery,
    reset,
    debounce,
  }
}
