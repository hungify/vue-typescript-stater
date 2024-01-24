import type * as v from 'valibot'
import type { AuthEndpoint } from '#/enums/endpoint'
import type { authSchema } from '#/schemas/auth'
import type { Operation } from './endpoints'
import type { authService } from '#/services/auth'

export interface AuthOutput {
  LoginRequest: v.Output<typeof authSchema.loginRequest>
  RegisterRequest: v.Output<typeof authSchema.registerRequest>
  RefreshRequest: v.Output<typeof authSchema.refreshRequest>
  LogoutRequest: v.Output<typeof authSchema.logoutRequest>

  LoginResponse: v.Output<typeof authSchema.loginResponse>
  RegisterResponse: v.Output<typeof authSchema.registerResponse>
  RefreshResponse: v.Output<typeof authSchema.refreshResponse>
  LogoutResponse: v.Output<typeof authSchema.logoutResponse>
}

export interface AuthEndpoints {
  [AuthEndpoint.LOGIN]: Operation<
    AuthEndpoint.LOGIN,
    AuthOutput['LoginResponse'],
    AuthOutput['LoginRequest']
  >
  [AuthEndpoint.REGISTER]: Operation<
    AuthEndpoint.REGISTER,
    AuthOutput['RefreshResponse'],
    AuthOutput['RegisterRequest']
  >
  [AuthEndpoint.REFRESH_TOKEN]: Operation<
    AuthEndpoint.REFRESH_TOKEN,
    AuthOutput['RefreshResponse'],
    AuthOutput['RefreshRequest']
  >
  [AuthEndpoint.LOGOUT]: Operation<
    AuthEndpoint.LOGOUT,
    AuthOutput['LogoutResponse'],
    AuthOutput['LogoutRequest']
  >
}

export type AuthServiceType = typeof authService
