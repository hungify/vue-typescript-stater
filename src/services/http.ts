import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
} from 'axios';
import axios from 'axios';
import type { z } from 'zod';
import type { AllEndpoint } from '~/interfaces/endpoint';
import { envVariables } from '~/utils/env';

export interface HttpRequestConfig<T> extends AxiosRequestConfig {
  data?: T;
  params?: T;
}

export default abstract class HttpRequest {
  #instance: AxiosInstance;
  #accessToken: string;

  public constructor(accessToken?: string, configs?: AxiosRequestConfig) {
    this.#accessToken = accessToken || '';
    this.#instance = axios.create({
      baseURL: configs?.baseURL ?? envVariables.viteBaseApi,
      ...configs,
    });
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }
  private initializeRequestInterceptor = () => {
    this.#instance.interceptors.request.use(this.handleRequest);
  };

  private handleRequest = (config: InternalAxiosRequestConfig) => {
    if (!config.url) {
      return config;
    }

    const currentUrl = new URL(config.url, config.baseURL);
    Object.entries(config.urlParams || {}).forEach(([k, v]) => {
      currentUrl.pathname = currentUrl.pathname.replace(`:${k}`, encodeURIComponent(v));
    });

    return {
      ...config,
      baseURL: currentUrl.origin,
      url: currentUrl.pathname,
      Authorization: `Bearer ${this.#accessToken}`,
    };
  };

  private initializeResponseInterceptor = () => {
    this.#instance.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private handleResponse = (response: AxiosResponse) => {
    if (response.headers && response.headers.authorization) {
      const accessToken = response.headers.authorization.split(' ')[1];
      if (accessToken) {
        this.#accessToken = accessToken;
      }
    }
    return response.data;
  };

  private handleError = async (error: AxiosError) => {
    const originalRequest = error.config;
    if (originalRequest && error.response?.status === 401) {
      // refresh token here
      return this.#instance(originalRequest);
    }
    throw error;
  };

  public async axiosRequest<TRequestData, TResponseData>({
    method,
    path,
    requestSchema,
    responseSchema,
    requestData,
    config,
    shouldReturnFullResponse,
  }: {
    path: AllEndpoint;
    method: Method;
    requestSchema: z.Schema<TRequestData>;
    responseSchema: z.Schema<TResponseData>;
    requestData?: TRequestData;
    config?: HttpRequestConfig<TRequestData>;
    shouldReturnFullResponse?: boolean;
  }): Promise<AxiosResponse<TResponseData> | TResponseData> {
    const data = requestSchema.parse(requestData);

    const axiosRequestConfig: AxiosRequestConfig = {
      method,
      url: path,
      ...config,
      data,
    };

    if (method === 'GET' && path.split(':').length > 0) {
      axiosRequestConfig.params = data;
      axiosRequestConfig.data = undefined;
    }

    const response = await this.#instance.request<TResponseData>(axiosRequestConfig);

    if (envVariables.prod) {
      const result = responseSchema.safeParse(response);
      if (!result.success) {
        // request report error to server
        console.error(result.error);
      }
    }
    responseSchema.parse(response);

    return shouldReturnFullResponse ? response : response.data;
  }

  public get instance() {
    return this.#instance;
  }
}
