import HttpRequest from './http'
import type { AuthOutput } from '#/types/auth'
import { authSchema } from '#/schemas/auth'
import { AuthEndpoint } from '#/enums/endpoint'

// eslint-disable-next-line import/no-default-export
export default class AuthService extends HttpRequest {
  public login(data: AuthOutput['LoginRequest']) {
    return this.axiosRequest({
      method: 'POST',
      endpoint: AuthEndpoint.LOGIN,
      requestData: {
        data,
        queryParams: null,
      },
      requestSchema: {
        data: authSchema.loginRequest,
        queryParams: null,
      },
      responseSchema: authSchema.loginResponse,
    })
  }

  public register(data: AuthOutput['RegisterRequest']) {
    return this.axiosRequest({
      method: 'POST',
      endpoint: AuthEndpoint.REGISTER,
      requestData: {
        data,
        queryParams: null,
      },
      requestSchema: {
        data: authSchema.registerRequest,
        queryParams: null,
      },
      responseSchema: authSchema.registerResponse,
    })
  }

  public refreshToken() {
    return this.axiosRequest({
      method: 'GET',
      endpoint: AuthEndpoint.REFRESH_TOKEN,
      responseSchema: authSchema.refreshResponse,
      requestData: {
        data: null,
        queryParams: null,
      },
      requestSchema: {
        queryParams: null,
        data: null,
      },
    })
  }

  public logout() {
    return this.axiosRequest({
      method: 'DELETE',
      endpoint: AuthEndpoint.LOGOUT,
      responseSchema: authSchema.logoutResponse,
      requestData: {
        queryParams: null,
        data: null,
      },
      requestSchema: {
        data: null,
        queryParams: null,
      },
    })
  }
}
export const authService = new AuthService()
