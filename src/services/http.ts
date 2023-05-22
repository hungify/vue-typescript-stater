import type { AllEndpoint } from '#/interfaces/endpoint';
import type { GetQueryString, Prettify } from '#/types/utils';
import { envVariables } from '#/utils/env';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
} from 'axios';
import axios from 'axios';
import { type z, ZodError } from 'zod';

interface HttpRequestConfig<TParams, TData> extends AxiosRequestConfig {
  data?: TData;
  params?: TParams;
}

type ZodObjectBuilder<T> = z.ZodObject<Record<keyof T, z.ZodTypeAny>, 'strict', z.ZodTypeAny, T, T>;

type CheckForBadBody<TRequestSchema> = TRequestSchema extends null ? null : TRequestSchema;

type CheckForBadQueryParams<TPath extends AllEndpoint> = GetQueryString<TPath> extends null
  ? null
  : Prettify<GetQueryString<TPath>>;

type CheckForBadParamsSchema<
  TPath extends AllEndpoint,
  TRequestSchema,
> = GetQueryString<TPath> extends TRequestSchema
  ? ZodObjectBuilder<GetQueryString<TPath>>
  : TRequestSchema;

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
      url: path,
      data: requestData.data,
      params: requestData.params,
    };

    if (envVariables.prod) {
      if (requestSchema.data) {
        const result = requestSchema.data.safeParse(requestData.data);
        if (!result.success) {
          // report request error to the server
          console.error(result.error);
        }
      }

      if (requestSchema.params) {
        const result = requestSchema.params.safeParse(requestData.params);
        if (!result.success) {
          // report request error to the server
          console.error(result.error);
        }
      }
    } else {
      if (requestSchema.data) {
        const res = requestSchema.data.parse(requestData.data);
        if (res instanceof ZodError) {
          throw res;
        }
      }
      if (requestSchema.params) {
        const res = requestSchema.params.parse(requestData.params);
        if (res instanceof ZodError) {
          throw res;
        }
      }
    }

    const { data } = await this.#instance.request<z.infer<TResponseSchema>>(axiosRequestConfig);

    if (responseSchema) {
      if (envVariables.prod) {
        const result = responseSchema.safeParse(data);
        if (!result.success) {
          // request report error to server
          console.error(result.error);
        }
      }
      const res = responseSchema.parse(data);

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
