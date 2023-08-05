import type { MergeUnion, Split } from './utils'

type InferType<T> = T extends 'string'
  ? string
  : T extends 'number'
  ? number
  : T extends 'boolean'
  ? boolean
  : never

type ArrayQueryParams<TQuery extends string> = Split<TQuery, '?'>

type ExtractParamKeys<TQuery extends string> =
  ArrayQueryParams<TQuery>[0] extends `${infer Start}/:${infer Param}/${infer Rest}`
    ? ExtractParamKeys<Start> | ExtractParamKeys<Rest> | Param
    : ArrayQueryParams<TQuery>[0] extends `${infer Start}/:${infer Param}`
    ? ExtractParamKeys<Start> | Param
    : never

type QueryElements<TQuery extends string> = ArrayQueryParams<TQuery> extends [string, string]
  ? Split<ArrayQueryParams<TQuery>[1], '&'>
  : never

type QueryParams<TQuery extends string> = QueryElements<TQuery> extends infer Element
  ? Element extends string[]
    ? {
        [QueryElement in Element[number]]: QueryElement extends `${infer Key}=(${infer Type})`
          ? Partial<Record<Key, InferType<Type>>>
          : QueryElement extends `${infer Key}=${infer Type}`
          ? Record<Key, InferType<Type>>
          : never
      }[Element[number]]
    : never
  : never

export type ExtractPathParams<TQuery extends string> = Record<ExtractParamKeys<TQuery>, string>

export type ExtractQueryParams<TQuery extends string> = MergeUnion<QueryParams<TQuery>>
