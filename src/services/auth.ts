import type { AxiosRequestConfig } from 'axios';
import { AuthEndpoint } from '#/enums/endpoint';
import type { LoginRequest, RegisterRequest } from '#/types/auth';
import { authSchemaRequest, authSchemaResponse } from '#/schemas/auth';
import HttpRequest from './http';
import { z } from 'zod';

export class AuthService extends HttpRequest {
  public login(data: LoginRequest, config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'post',
      path: AuthEndpoint.LOGIN,
      requestData: data,
      requestSchema: authSchemaRequest.login,
      responseSchema: authSchemaResponse.login,
      config,
    });
  }

  public register(data: RegisterRequest, config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'post',
      path: AuthEndpoint.REGISTER,
      requestData: data,
      requestSchema: authSchemaRequest.register,
      responseSchema: authSchemaResponse.register,
      config,
    });
  }

  public refreshToken(config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'GET',
      path: AuthEndpoint.REFRESH_TOKEN,
      responseSchema: authSchemaResponse.refresh,
      requestData: {},
      requestSchema: z.object({}),
      config,
    });
  }

  public logout(config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'DELETE',
      path: AuthEndpoint.LOGOUT,
      requestSchema: authSchemaRequest.logout,
      responseSchema: authSchemaResponse.logout,
      requestData: {},
      config,
    });
  }
}
