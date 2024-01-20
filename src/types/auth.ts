import type { authSchema } from '#/schemas/auth'
import * as v from 'valibot'

export namespace AuthSchema {
  export type LoginRequest = v.Output<typeof authSchema.loginRequest>
  export type RegisterRequest = v.Output<typeof authSchema.registerRequest>
  export type RefreshRequest = v.Output<typeof authSchema.refreshRequest>
  export type LogoutRequest = v.Output<typeof authSchema.logoutRequest>
}
