import type { Merge, ReplaceFirstString, Split } from './utils'

type QueryElements<T extends string> = Split<ReplaceFirstString<T, '?', '@'>, '@'>

type ArrayQueryParams<T extends string> = Split<QueryElements<T>[1], '&'>

export type QueryParamsKey<T extends string> = NonNullable<
  Split<ArrayQueryParams<T>[number], '='>[1]
> extends `${infer S}`
  ? S
  : never

type RequiredQueryParamsKey<T extends string> = Exclude<QueryParamsKey<T>, `?${string}`>

type OptionalQueryParamsKey<T extends string> = Split<
  Extract<QueryParamsKey<T>, `?${string}`>,
  '?'
>[1]

type GroupQueryParams<T extends string> = Merge<
  Record<RequiredQueryParamsKey<T>, string>,
  Partial<Record<OptionalQueryParamsKey<T>, string>>
> extends Record<string, never>
  ? never
  : Merge<
      Record<RequiredQueryParamsKey<T>, string>,
      Partial<Record<OptionalQueryParamsKey<T>, string>>
    >

export type ExtractPathParams<TPath extends string> = {
  [K in Split<TPath, '/'>[number] as K extends `:${infer P}` ? P : never]: string
}

export type ExtractQueryParams<T extends string> = ArrayQueryParams<T> extends never
  ? null
  : GroupQueryParams<T>
