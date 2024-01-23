/* eslint-disable @typescript-eslint/no-explicit-any */

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never

export type Modify<T, R> = Omit<T, keyof R> & R

export type Split<
  S extends string,
  SEP extends string,
> = S extends `${infer K}${SEP}${infer R}`
  ? [K, ...Split<R, SEP>]
  : S extends `${infer K}`
    ? SEP extends ''
      ? []
      : [K]
    : string[]

export type LooseAutoComplete<T extends string> = T | Omit<string, T>

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & NonNullable<unknown>

export type ReplaceFirstString<
  S extends string,
  From extends string,
  To extends string,
> = S extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : S

export type MergeObject<F, S, R = Omit<F, keyof S> & S> = {
  [k in keyof R]: R[k]
}

export type KeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition ? K : never
}[keyof T]

export type DeepKeysOfValue<T, TCondition> = {
  [K in keyof T]: T[K] extends TCondition
    ? K
    : T[K] extends object
      ? `${K & string}.${DeepKeysOfValue<T[K], TCondition> & string}`
      : never
}[keyof T]

export type MergeUnion<TObject> =
  UnionToIntersection<TObject> extends infer O
    ? { [K in keyof O]: O[K] }
    : never

type StringUnionToUnion<
  T extends string,
  Separator extends string = '|',
> = T extends `${infer Letter}${Separator}${infer Rest}`
  ? Letter | StringUnionToUnion<Rest>
  : T

interface Primitives {
  string: string
  number: number
  boolean: boolean
  bigint: bigint
  undefined: undefined
  null: null
}

export type InferPrimitivesType<T extends string> =
  StringUnionToUnion<T> extends infer U
    ? U extends keyof Primitives
      ? Primitives[U]
      : U
    : never

export type HasAnyKeys<T extends Record<string, unknown>> =
  keyof T extends never ? false : true
