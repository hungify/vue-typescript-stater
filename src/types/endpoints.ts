import type * as v from 'valibot'
import type { AuthEndpoint, PostEndpoint } from '#/enums/endpoint'
import type { ExtractMethod, ExtractQueryParams } from '#/types/url'
import type { AuthEndpoints } from './auth'
import type { PostEndpoints } from './post'
import type { Split } from './utils'

export type AllEndpoint =
  | `${AuthEndpoint}`
  | `${PostEndpoint}`
  | (string & NonNullable<unknown>)

export type Operation<
  Endpoint extends AllEndpoint,
  Response extends Record<string, unknown> | Record<string, unknown>[],
  Body,
  QueryParams = ExtractQueryParams<Split<Endpoint, ' '>[1]>,
  Method = ExtractMethod<Endpoint>,
> = {
  queryParams: QueryParams
  method: Method
  path: Endpoint
  schema: {
    response: v.BaseSchema<Response>
    body: Body extends null ? null : v.BaseSchema<Body>
    queryParams: QueryParams extends null ? null : v.BaseSchema<QueryParams>
  }
}

export interface Endpoints extends AuthEndpoints, PostEndpoints {}
