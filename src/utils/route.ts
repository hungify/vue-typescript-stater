// type LocationQueryValue = string | number | null

import type { LocationQueryValue } from 'vue-router/auto'

type LocationQuery = {
  [x: string]: LocationQueryValue | LocationQueryValue[]
}

type Kind = 'fn' | 'val'

export type GetRouteQuery<T extends NonNullable<unknown>, K extends Kind> = {
  [P in keyof T]: K extends 'fn' ? () => NonNullable<T[P]> : NonNullable<T[P]>
}

export const getRouteQuery = <T extends LocationQuery>(query: T) => {
  return <const K extends Kind>(kind: K) => {
    return Object.fromEntries(
      Object.keys(query).map((key) => {
        if (typeof query[key] === 'number') {
          const value = query?.[key]

          return [key, kind === 'val' ? value : () => Number(value)]
        } else {
          const value = query?.[key]?.toString()

          return [key, kind === 'val' ? value : () => value]
        }
      }),
    ) as GetRouteQuery<T, K>
  }
}
