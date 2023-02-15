import type { AxiosRequestConfig } from 'axios';
import { AuthEndpoint } from '~/constants/endpoint';
import type { LoginRequest, RegisterRequest } from '~/interfaces/auth';
import { authSchemaRequest, authSchemaResponse } from '~/schemas/auth';
import HttpRequest from '../http';

export class AuthService extends HttpRequest {
  public login(data: LoginRequest, config?: AxiosRequestConfig) {
    const response = this.axiosRequest({
      method: 'post',
      path: AuthEndpoint.LOGIN,
      requestData: data,
      requestSchema: authSchemaRequest.login,
      responseSchema: authSchemaResponse.login,
      config,
    });
    return response;
  }

  public register(data: RegisterRequest, config?: AxiosRequestConfig) {
    const path = AuthEndpoint.REGISTER;
    const response = this.axiosRequest({
      method: 'post',
      path,
      requestData: data,
      requestSchema: authSchemaRequest.register,
      responseSchema: authSchemaResponse.register,
      config,
    });
    return response;
  }

  public refreshToken(config?: AxiosRequestConfig) {
    const path = AuthEndpoint.REFRESH_TOKEN;
    const response = this.axiosRequest({
      method: 'GET',
      path,
      requestSchema: authSchemaRequest.refresh,
      responseSchema: authSchemaResponse.refresh,
      config,
    });
    return response;
  }

  public logout(config?: AxiosRequestConfig) {
    const path = AuthEndpoint.LOGOUT;
    const response = this.axiosRequest({
      method: 'POST',
      path,
      requestSchema: authSchemaRequest.logout,
      responseSchema: authSchemaResponse.logout,
      config,
    });
    return response;
  }
}
