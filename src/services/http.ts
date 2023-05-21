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
import { ZodError } from 'zod';
import type { AllEndpoint } from '#/interfaces/endpoint';
import type { GetQueryString } from '#/types/utils';
import { envVariables } from '#/utils/env';

interface HttpRequestConfig<T> extends AxiosRequestConfig {
  data?: T;
  params?: T;
}

type CheckForBadRequestData<
  TPath extends AllEndpoint,
  TRequestSchema,
> = GetQueryString<TPath> extends TRequestSchema
  ? GetQueryString<TPath>
  : 'requestData and requestSchema or query string are not matched. Let use `requestSchema: z.object({}), requestData: {}` for empty request data, query string';

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
    return response;
  };

  private handleError = async (error: AxiosError) => {
    const originalRequest = error.config;
    if (originalRequest && error.response?.status === 401) {
      // refresh token here
      return this.#instance(originalRequest);
    }
    throw error;
  };

  public async axiosRequest<
    TPath extends AllEndpoint,
    TResponseSchema extends z.ZodTypeAny = z.ZodTypeAny,
    TRequestSchema extends z.ZodTypeAny = z.ZodTypeAny,
  >({
    method = 'GET' || 'get',
    path,
    requestSchema,
    responseSchema,
    requestData,
    config,
    shouldReturnFullResponse = true,
  }: {
    path: TPath;
    method: Method;
    requestSchema: TRequestSchema;
    requestData: CheckForBadRequestData<TPath, z.infer<TRequestSchema>>;
    responseSchema: TResponseSchema;
    config?: HttpRequestConfig<z.infer<TRequestSchema>>;
    shouldReturnFullResponse?: boolean;
  }): Promise<AxiosResponse<z.infer<TResponseSchema>>>;

  public async axiosRequest<
    TPath extends AllEndpoint,
    TResponseSchema extends z.ZodTypeAny = z.ZodTypeAny,
    TRequestSchema extends z.ZodTypeAny = z.ZodTypeAny,
  >({
    method,
    path,
    requestSchema,
    responseSchema,
    requestData,
    config,
    shouldReturnFullResponse = true,
  }: {
    path: TPath;
    method: Method;
    requestSchema: TRequestSchema;
    requestData: z.infer<TRequestSchema>;
    responseSchema: TResponseSchema;
    config?: HttpRequestConfig<z.infer<TRequestSchema>>;
    shouldReturnFullResponse?: boolean;
  }): Promise<AxiosResponse<z.infer<TResponseSchema>>>;

  public async axiosRequest<
    TPath extends AllEndpoint,
    TResponseSchema extends z.ZodTypeAny = z.ZodTypeAny,
    TRequestSchema extends z.ZodTypeAny = z.ZodTypeAny,
  >({
    method,
    path,
    requestSchema,
    responseSchema,
    requestData,
    config,
    shouldReturnFullResponse = false,
  }: {
    path: TPath;
    method: Method;
    requestSchema: TRequestSchema;
    requestData: z.infer<TRequestSchema>;
    responseSchema: TResponseSchema;
    config?: HttpRequestConfig<z.infer<TRequestSchema>>;
    shouldReturnFullResponse?: boolean;
  }): Promise<z.infer<TResponseSchema>>;

  public async axiosRequest<
    TPath extends AllEndpoint,
    TResponseSchema extends z.ZodTypeAny = z.ZodTypeAny,
    TRequestSchema extends z.ZodTypeAny = z.ZodTypeAny,
  >({
    method,
    path,
    requestSchema,
    responseSchema,
    requestData,
    config,
    shouldReturnFullResponse = false,
  }: {
    path: TPath;
    method: Method;
    requestSchema: TRequestSchema;
    requestData: z.infer<TRequestSchema>;
    responseSchema: z.infer<TResponseSchema>;
    config?: HttpRequestConfig<z.infer<TRequestSchema>>;
    shouldReturnFullResponse?: boolean;
  }): Promise<AxiosResponse<z.infer<TResponseSchema>> | z.infer<TResponseSchema>> {
    const data = requestSchema ? requestSchema.parse(requestData) : requestData;

    const axiosRequestConfig: AxiosRequestConfig = {
      method,
      url: path,
      ...config,
      data,
    };

    if (method === 'GET' && Object.keys(requestData).length) {
      axiosRequestConfig.params = data;
      axiosRequestConfig.data = undefined;
    }

    const response = await this.#instance.request<z.infer<TResponseSchema>>(axiosRequestConfig);

    if (responseSchema) {
      if (envVariables.prod) {
        const result = responseSchema.safeParse(response);
        if (!result.success) {
          // request report error to server
          console.error(result.error);
        }
      }
      const res = shouldReturnFullResponse
        ? responseSchema.parse(response)
        : responseSchema.parse(response.data);

      if (res instanceof ZodError) {
        console.error(res);
        throw res;
      }
    }

    return shouldReturnFullResponse ? response : response.data;
  }

  public get instance() {
    return this.#instance;
  }
}
