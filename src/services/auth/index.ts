import type { AxiosRequestConfig } from 'axios';
import { AuthEndpoint } from '~/constants/endpoint';
import type { LoginRequest, RegisterRequest } from '~/interfaces/auth';
import { authSchemaRequest, authSchemaResponse } from '~/schemas/auth';
import HttpRequest from '../http';

export class AuthService extends HttpRequest {
  public login(data: LoginRequest, config?: AxiosRequestConfig) {
    const path = AuthEndpoint.LOGIN;
    const execute = this.axiosRequest({
      method: 'POST',
      path,
      requestSchema: authSchemaRequest.login,
      responseSchema: authSchemaResponse.login,
      config,
    });
    return execute({ ...data });
  }

  public register(data: RegisterRequest, config?: AxiosRequestConfig) {
    const path = AuthEndpoint.REGISTER;
    const execute = this.axiosRequest({
      method: 'POST',
      path,
      requestSchema: authSchemaRequest.register,
      responseSchema: authSchemaResponse.register,
      config,
    });
    return execute({ ...data });
  }

  public refreshToken(config?: AxiosRequestConfig) {
    const path = AuthEndpoint.REFRESH_TOKEN;
    const execute = this.axiosRequest({
      method: 'POST',
      path,
      requestSchema: authSchemaRequest.refresh,
      responseSchema: authSchemaResponse.refresh,
      config,
    });
    return execute({});
  }

  public logout(config?: AxiosRequestConfig) {
    const path = AuthEndpoint.LOGOUT;
    const execute = this.axiosRequest({
      method: 'POST',
      path,
      requestSchema: authSchemaRequest.logout,
      responseSchema: authSchemaResponse.logout,
      config,
    });
    return execute({});
  }
}
