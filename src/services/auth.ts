import type { AxiosRequestConfig } from 'axios';
import { AuthEndpoint } from '#/enums/endpoint';
import type { LoginRequest, RegisterRequest } from '#/types/auth';
import { authSchemaRequest, authSchemaResponse } from '#/schemas/auth';
import HttpRequest from './http';

export class AuthService extends HttpRequest {
  public login(data: LoginRequest, config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'post',
      path: AuthEndpoint.LOGIN,
      requestData: {
        data,
        params: null,
      },
      requestSchema: {
        data: authSchemaRequest.login,
        params: null,
      },
      responseSchema: authSchemaResponse.login,
      config,
    });
  }

  public register(data: RegisterRequest, config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'post',
      path: AuthEndpoint.REGISTER,
      requestData: {
        data,
        params: null,
      },
      requestSchema: {
        data: authSchemaRequest.register,
        params: null,
      },
      responseSchema: authSchemaResponse.register,
      config,
    });
  }

  public refreshToken(config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'GET',
      path: AuthEndpoint.REFRESH_TOKEN,
      responseSchema: authSchemaResponse.refresh,
      requestData: {
        data: null,
        params: null,
      },
      requestSchema: {
        params: null,
        data: null,
      },
      config,
    });
  }

  public logout(config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'DELETE',
      path: AuthEndpoint.LOGOUT,
      responseSchema: authSchemaResponse.logout,
      requestData: {
        data: null,
        params: null,
      },
      requestSchema: {
        params: null,
        data: null,
      },
      config,
    });
  }
}
