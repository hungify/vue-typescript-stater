import type { Merge, Prettify, ReplaceFirstString, Split } from './utils';

type QueryElements<T extends string> = Split<ReplaceFirstString<T, '?', '@'>, '@'>;

type ArrayPathParams<T extends string> = Split<QueryElements<T>[0], '/'>;

export type PathParamsKey<T extends string> = NonNullable<
  Split<ArrayPathParams<T>[number], ':'>[1]
> extends `${infer S}`
  ? S
  : never;

type ArrayQueryParams<T extends string> = Split<QueryElements<T>[1], '&'>;

export type QueryParamsKey<T extends string> = NonNullable<
  Split<ArrayQueryParams<T>[number], '='>[1]
> extends `${infer S}`
  ? S
  : never;

type RequiredQueryParamsKey<T extends string> = Exclude<QueryParamsKey<T>, `?${string}`>;

type OptionalQueryParamsKey<T extends string> = Split<
  Extract<QueryParamsKey<T>, `?${string}`>,
  '?'
>[1];

type GroupQueryParams<T extends string> = Merge<
  Record<RequiredQueryParamsKey<T>, string>,
  Partial<Record<OptionalQueryParamsKey<T>, string>>
> extends Record<string, never>
  ? never
  : Merge<
      Record<RequiredQueryParamsKey<T>, string>,
      Partial<Record<OptionalQueryParamsKey<T>, string>>
    >;

export type GetPathParams<T extends string> = PathParamsKey<T> extends never
  ? null
  : Prettify<Record<PathParamsKey<T>, string>>;

export type GetQueryParams<T extends string> = ArrayQueryParams<T> extends never
  ? null
  : Prettify<GroupQueryParams<T>>;
