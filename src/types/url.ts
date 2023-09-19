import type { Split, MergeUnion, ReplaceFirstString, InferPrimitivesType } from './utils'

// Void ? split url into path and query params
type NormalizeQueryUrl<TQuery extends string> = ReplaceFirstString<TQuery, '?', '@'>

type RawQueryPath<TQuery extends string> = Split<NormalizeQueryUrl<TQuery>, '@'>[0]

type ExtractParamKeys<TQuery extends string> =
  RawQueryPath<TQuery> extends `${infer Start}/${infer Rest}`
    ? ExtractParamKeys<Start> & ExtractParamKeys<Rest>
    : TQuery extends `[${infer Param}]`
    ? Param extends `${infer Name}:${infer Type}`
      ? { [K in Name]: InferPrimitivesType<Type> }
      : { [K in Param]: string }
    : NonNullable<unknown>

export type ExtractPathParams<TQuery extends string> = ExtractParamKeys<
  RawQueryPath<TQuery>
> extends infer Keys
  ? {
      [K in keyof Keys]: Keys[K]
    }
  : never

type RawQueryParams<TQuery extends string> = Split<NormalizeQueryUrl<TQuery>, '@'>[1]

type QueryElements<TQuery extends string> = Split<RawQueryParams<TQuery>, '&'>

type QueryParams<TQuery extends string> = QueryElements<TQuery> extends infer Element
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

export type ExtractQueryParams<TQuery extends string> = MergeUnion<QueryParams<TQuery>>

// type ExtractQueryParams<TQuery extends string> = TQuery extends
//   | `${infer Start}&${infer Rest}`
//   | `${string}?${infer End}`
//   ? ExtractQueryParams<Start> & ExtractQueryParams<Rest> & ExtractQueryParams<End>
//   : TQuery extends `[${infer Param}]`
//   ? Param extends `${infer Name}:${infer Type}`
//     ? {
//         [K in Name]: Type extends 'number' ? number : string
//       }
//     : { [K in Param]: string }
//   : NonNullable<unknown>
