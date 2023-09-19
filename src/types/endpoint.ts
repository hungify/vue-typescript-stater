import type { AuthEndpoint, PostEndpoint } from '#/enums/endpoint'

export type AllEndpoint = `${AuthEndpoint}` | `${PostEndpoint}` | (string & NonNullable<unknown>)
