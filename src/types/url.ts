import type { Split } from './utils';

type QueryElements<T extends string> = Split<T, '?'>;

type SplitURLPath<T extends string> = Split<QueryElements<T>[0], '/'>;

export type ExtractPathParamsKey<T extends string> = Split<SplitURLPath<T>[number], ':'>[1];

type SplitQueryString<T extends string> = Split<QueryElements<T>[1], '&'>;

export type ExtractQueryStringKey<T extends string> = Split<SplitQueryString<T>[number], '=:'>[0];
