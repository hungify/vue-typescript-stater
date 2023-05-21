import type { ExtractPathParamsKey, ExtractQueryStringKey } from './url';

export type Modify<T, R> = Omit<T, keyof R> & R;

export type Split<S extends string, SEP extends string> = S extends `${infer K}${SEP}${infer R}`
  ? [K, ...Split<R, SEP>]
  : S extends `${infer K}`
  ? SEP extends ''
    ? []
    : [K]
  : string[];

export type LooseAutoComplete<T extends string> = T | Omit<string, T>;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & NonNullable<unknown>;

export type GetPathParams<T extends string> = {
  [K in ExtractPathParamsKey<T>]: string;
};

export type GetQueryString<T extends string> = {
  [K in ExtractQueryStringKey<T>]: string;
};
