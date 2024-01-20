import type { AxiosRequestConfig } from 'axios'
import HttpRequest from './http'
import { AuthEndpoint } from '#/enums/endpoint'
import { authSchema } from '#/schemas/auth'
import type { AuthSchema } from '#/types/auth'
import * as v from 'valibot'

export class AuthService extends HttpRequest {
  public login(data: AuthSchema.LoginRequest, config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'post',
      path: AuthEndpoint.LOGIN,
      requestData: {
        data,
        params: v.any(),
      },
      requestSchema: {
        data: authSchema.loginRequest,
        params: v.any(),
      },
      responseSchema: authSchema.loginResponse,
      config,
    })
  }

  // public register(data: RegisterRequest, config?: AxiosRequestConfig) {
  //   return this.axiosRequest({
  //     method: 'post',
  //     path: AuthEndpoint.REGISTER,
  //     requestData: {
  //       data,
  //       params: null,
  //     },
  //     requestSchema: {
  //       data: authSchema.registerRequest,
  //       params: null,
  //     },
  //     responseSchema: authSchema.registerResponse,
  //     config,
  //   })
  // }

  // public refreshToken(config?: AxiosRequestConfig) {
  //   return this.axiosRequest({
  //     method: 'GET',
  //     path: AuthEndpoint.REFRESH_TOKEN,
  //     responseSchema: authSchema.refreshResponse,
  //     requestData: {
  //       data: null,
  //       params: null,
  //     },
  //     requestSchema: {
  //       params: null,
  //       data: null,
  //     },
  //     config,
  //   })
  // }

  // public logout(config?: AxiosRequestConfig) {
  //   return this.axiosRequest({
  //     method: 'DELETE',
  //     path: AuthEndpoint.LOGOUT,
  //     responseSchema: authSchema.logoutResponse,
  //     requestData: {
  //       data: null,
  //       params: null,
  //     },
  //     requestSchema: {
  //       params: null,
  //       data: null,
  //     },
  //     config,
  //   })
  // }
}
