import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import axios from 'axios';
import type { z } from 'zod';
import type { AllEndpoint } from '~/interfaces/endpoint';

abstract class BaseRequest {
  private _instance: AxiosInstance;
  private _accessToken: string;

  public constructor(accessToken?: string, configs?: AxiosRequestConfig) {
    this._accessToken = accessToken || '';
    this._instance = axios.create({
      baseURL: configs?.baseURL ?? import.meta.env.VITE_API_URL,
      ...configs,
    });
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this._instance.interceptors.request.use(this.handleRequest);
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${this._accessToken}`,
    };
    return config;
  };

  private initializeResponseInterceptor = () => {
    this._instance.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private handleResponse = (response: AxiosResponse) => {
    if (response.headers && response.headers.authorization) {
      const accessToken = response.headers.authorization.split(' ')[1];
      if (accessToken) {
        this._accessToken = accessToken;
      }
    }
    return response;
  };

  private handleError = async (error: AxiosError) => {
    const originalRequest = error.config;
    if (originalRequest && error.response?.status === 401) {
      // refresh token here
      return this._instance(originalRequest);
    }
  };

  public axiosRequest<Request, Response>({
    method,
    path,
    requestSchema,
    responseSchema,
  }: {
    method: Method;
    path: AllEndpoint;
    requestSchema: z.ZodType<Request>;
    responseSchema: z.ZodType<Response>;
    config?: AxiosRequestConfig;
  }): (data: Request) => Promise<Response> {
    return (requestData: Request, config?: AxiosRequestConfig) => {
      requestSchema.parse(requestData);

      const execute = async () => {
        const response = await this._instance({
          method,
          url: path,
          [method === 'GET' ? 'params' : 'data']: requestData,
          ...config,
        });

        if (process.env.NODE_ENV === 'production') {
          const result = responseSchema.safeParse(response.data);
          if (!result.success) {
            console.error(result.error);
          }
          return response.data as Response;
        }

        return responseSchema.parse(response.data);
      };

      return execute();
    };
  }
  public get instance() {
    return this._instance;
  }
}

export default class HttpRequest extends BaseRequest {
  public constructor(accessToken?: string) {
    super(accessToken);
  }
}
