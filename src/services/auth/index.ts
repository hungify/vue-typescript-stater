import type { AxiosRequestConfig } from 'axios';
import type { AuthByEndpoint } from '~/interfaces/modules/auth';
import { BaseRequest } from '../http';

export class AuthRequest extends BaseRequest {
  public execute<Endpoint extends keyof AuthByEndpoint<'request'>>(
    endpoint: Endpoint,
    data: AuthByEndpoint<'request'>[Endpoint],
    config?: AxiosRequestConfig,
  ) {
    return this.instance.post<AuthByEndpoint<'response'>[Endpoint]>(
      endpoint,
      {
        ...data,
      },
      config,
    );
  }
}
