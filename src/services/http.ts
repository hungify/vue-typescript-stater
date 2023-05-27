import type { AllEndpoint } from '#/interfaces/endpoint';
import type { GetQueryParams } from '#/types/url';
import type { Prettify } from '#/types/utils';
import type { ToZod } from '#/types/zod';
import { envVariables } from '#/utils/env';
import { normalizePath } from '#/utils/http';
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

interface HttpRequestConfig<TParams, TData> extends AxiosRequestConfig {
  data?: TData;
  params?: TParams;
}

type CheckForBadBody<TRequestSchema> = TRequestSchema extends null ? null : TRequestSchema;

type CheckForBadQueryParams<TPath extends AllEndpoint> = GetQueryParams<TPath> extends null
  ? null
  : Prettify<GetQueryParams<TPath>>;

type CheckForBadParamsSchema<
  TPath extends AllEndpoint,
  TRequestSchema,
> = GetQueryParams<TPath> extends TRequestSchema ? ToZod<GetQueryParams<TPath>> : TRequestSchema;

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
    if (this.#accessToken) {
      config.headers.setAuthorization(`Bearer ${this.#accessToken}`);
    }
    return config;
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
    TRequestDataSchema extends z.ZodTypeAny = z.ZodTypeAny,
    TRequestParamsSchema extends z.ZodTypeAny = z.ZodTypeAny,
  >({
    method,
    path,
    requestSchema,
    responseSchema,
    requestData,
    config,
  }: {
    path: TPath;
    method: Method;
    requestData: {
      data: CheckForBadBody<z.infer<TRequestDataSchema>> | null;
      params: CheckForBadQueryParams<TPath> | null;
    };
    requestSchema: {
      data: TRequestDataSchema | null;
      params: CheckForBadParamsSchema<TPath, z.infer<TRequestParamsSchema>> | null;
    };
    responseSchema: TResponseSchema | null;
    config?: HttpRequestConfig<z.infer<TRequestParamsSchema>, z.infer<TRequestDataSchema>>;
  }): Promise<z.infer<TResponseSchema>> {
    const axiosRequestConfig: AxiosRequestConfig = {
      ...config,
      method,
      url: normalizePath(path),
      params: requestData.params,
    };

    if (requestSchema.data) {
      Object.assign(axiosRequestConfig, { data: requestData.data });
      if (envVariables.prod) {
        const result = await requestSchema.data.safeParseAsync(requestData.data);
        if (!result.success) {
          // report request error to the server
          console.error(result.error);
        }
      } else {
        const res = await requestSchema.data.parseAsync(requestData.data);
        if (res instanceof ZodError) {
          throw res;
        }
      }
    }

    if (requestSchema.params) {
      if (envVariables.prod) {
        const result = await requestSchema.params.safeParseAsync(requestData.params);
        if (!result.success) {
          // report request error to the server
          console.error(result.error);
        }
      } else {
        const res = await requestSchema.params.parseAsync(requestData.params);
        if (res instanceof ZodError) {
          throw res;
        }
      }
    }

    const { data } = await this.#instance.request<z.infer<TResponseSchema>>(axiosRequestConfig);

    if (responseSchema) {
      if (envVariables.prod) {
        const result = await responseSchema.safeParseAsync(data);
        if (!result.success) {
          // request report error to server
          console.error(result.error);
        }
      }
      const res = await responseSchema.parseAsync(data);

      if (res instanceof ZodError) {
        console.error(res);
        throw res;
      }
    }

    return data;
  }

  public get instance() {
    return this.#instance;
  }
}
