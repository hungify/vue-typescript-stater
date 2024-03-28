import type { LocationQuery } from 'vue-router/auto'
import { getRouteQuery } from '#/utils/route'

export const useRouteQuery = <T extends LocationQuery>() => {
  const route = useRoute()

  const fnRouteQuery = computed(() => {
    return getRouteQuery<T>(route.query as T)('fn')
  })

  const valRouteQuery = computed(() => {
    return getRouteQuery<T>(route.query as T)('val')
  })

  return {
    valRouteQuery,
    fnRouteQuery,
  }
}
