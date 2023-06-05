/* eslint-disable @typescript-eslint/no-explicit-any */
import type { z } from 'zod';

type IsAny<T> = [any extends T ? 'true' : 'false'] extends ['true'] ? true : false;
type NonOptional<T> = T extends undefined ? never : T;
type Equals<X, Y> = [X] extends [Y] ? ([Y] extends [X] ? true : false) : false;

export type ToZod<T> = {
  any: never;
  optional: z.ZodOptional<ToZod<NonOptional<T>>>;
  nullable: z.ZodNullable<ToZod<NonNullable<T>>>;
  array: T extends Array<infer U>
    ? z.ZodArray<ToZod<U>> | z.ZodDefault<z.ZodArray<ToZod<U>>>
    : never;
  string: z.ZodString | z.ZodDefault<z.ZodString>;
  bigint: z.ZodBigInt | z.ZodDefault<z.ZodBigInt>;
  number: z.ZodNumber | z.ZodDefault<z.ZodNumber>;
  boolean: z.ZodBoolean | z.ZodDefault<z.ZodBoolean>;
  date: z.ZodDate | z.ZodDefault<z.ZodDate>;
  object: z.ZodObject<
    { [k in keyof T]: ToZod<T[k]> },
    'strict',
    z.ZodTypeAny,
    { [k in keyof T]: T[k] },
    { [k in keyof T]: T[k] }
  >;

  rest: never;
}[ZodKey<T>];

type ZodKey<T> = IsAny<T> extends true
  ? 'any'
  : Equals<T, boolean> extends true //[T] extends [booleanUtil.Type]
  ? 'boolean'
  : [undefined] extends [T]
  ? 'optional'
  : [null] extends [T]
  ? 'nullable'
  : T extends any[]
  ? 'array'
  : Equals<T, string> extends true
  ? 'string'
  : Equals<T, bigint> extends true //[T] extends [bigintUtil.Type]
  ? 'bigint'
  : Equals<T, number> extends true //[T] extends [numberUtil.Type]
  ? 'number'
  : Equals<T, Date> extends true //[T] extends [dateUtil.Type]
  ? 'date'
  : T extends { [k: string]: any } //[T] extends [structUtil.Type]
  ? 'object'
  : 'rest';
