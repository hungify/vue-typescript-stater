import { type ParsedQuery, getQuery } from 'ufo'

type FnRouteQuery<T extends NonNullable<unknown>> = {
  [P in keyof T]: () => NonNullable<T[P]>
}

export const useRouteQuery = <T extends ParsedQuery>() => {
  const route = useRoute()

  const fnRouteQuery = computed(() => {
    return objectKeys(valRouteQuery.value).reduce<FnRouteQuery<T>>(
      (acc, key) => ({
        ...acc,
        [key]: () => valRouteQuery.value[key]?.toString(),
      }),
      {} as FnRouteQuery<T>,
    )
  })

  const valRouteQuery = computed(() => {
    return getQuery<T>(route.fullPath)
  })

  return {
    valRouteQuery,
    fnRouteQuery,
  }
}
