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

export type ReplaceFirstString<
  S extends string,
  From extends string,
  To extends string,
> = S extends `${infer Prefix}${From}${infer Suffix}` ? `${Prefix}${To}${Suffix}` : S;

export type Merge<F, S> = Omit<F, keyof S> & S;
