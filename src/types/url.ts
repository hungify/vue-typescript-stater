import type {
  HasAnyKeys,
  InferPrimitivesType,
  MergeUnion,
  ReplaceFirstString,
  Split,
} from './utils'

export type ExtractMethod<TQuery extends string> = Split<TQuery, ' '>[0]

// Void ? split url into path and query params
type NormalizeUrl<TQuery extends string> = ReplaceFirstString<TQuery, '?', '@'>

export type ExtractPathName<TQuery extends string> = Split<
  NormalizeUrl<TQuery>,
  '@'
>[0]

type ExtractParamKeys<TQuery extends string> =
  ExtractPathName<TQuery> extends `${infer Start}/${infer Rest}`
    ? ExtractParamKeys<Start> & ExtractParamKeys<Rest>
    : TQuery extends `[${infer Param}]`
      ? Param extends `${infer Name}:${infer Type}`
        ? { [K in Name]: InferPrimitivesType<Type> }
        : { [K in Param]: string }
      : NonNullable<unknown>

export type ExtractPathParams<TQuery extends string> =
  ExtractParamKeys<ExtractPathName<TQuery>> extends infer Keys
    ? Keys extends Record<string, unknown>
      ? HasAnyKeys<Keys> extends true
        ? MergeUnion<Keys>
        : never
      : never
    : never

type RawQueryParams<TQuery extends string> = Split<NormalizeUrl<TQuery>, '@'>[1]

type QueryElements<TQuery extends string> = Split<RawQueryParams<TQuery>, '&'>

type QueryParams<TQuery extends string> =
  QueryElements<TQuery> extends infer Element
    ? Element extends string[]
      ? {
          [QueryElement in Element[number]]: QueryElement extends `[${infer Key}?:${infer Type}]`
            ? {
                [K in Key]?: InferPrimitivesType<Type>
              }
            : QueryElement extends `[${infer Key}:${infer Type}]`
              ? {
                  [K in Key]: InferPrimitivesType<Type>
                }
              : never
        }[Element[number]]
      : never
    : never

export type ExtractQueryParams<TQuery extends string> =
  QueryParams<TQuery> extends never ? null : MergeUnion<QueryParams<TQuery>>
