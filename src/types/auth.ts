import type { AuthEndpoint } from '#/enums/endpoint'
import type { authSchema } from '#/schemas/auth'
import * as v from 'valibot'
import type { Operation } from './endpoints'

export namespace AuthOutput {
  export type LoginRequest = v.Output<typeof authSchema.loginRequest>
  export type RegisterRequest = v.Output<typeof authSchema.registerRequest>
  export type RefreshRequest = v.Output<typeof authSchema.refreshRequest>
  export type LogoutRequest = v.Output<typeof authSchema.logoutRequest>

  export type LoginResponse = v.Output<typeof authSchema.loginResponse>
  export type RegisterResponse = v.Output<typeof authSchema.registerResponse>
  export type RefreshResponse = v.Output<typeof authSchema.refreshResponse>
  export type LogoutResponse = v.Output<typeof authSchema.logoutResponse>
}

export interface AuthEndpoints {
  [AuthEndpoint.LOGIN]: Operation<
    AuthEndpoint.LOGIN,
    AuthOutput.LoginResponse,
    AuthOutput.LoginRequest
  >
  [AuthEndpoint.REGISTER]: Operation<
    AuthEndpoint.REGISTER,
    AuthOutput.RefreshResponse,
    AuthOutput.RegisterRequest
  >
  [AuthEndpoint.REFRESH_TOKEN]: Operation<
    AuthEndpoint.REFRESH_TOKEN,
    AuthOutput.RefreshResponse,
    AuthOutput.RefreshRequest
  >
  [AuthEndpoint.LOGOUT]: Operation<
    AuthEndpoint.LOGOUT,
    AuthOutput.LogoutResponse,
    AuthOutput.LogoutRequest
  >
}
