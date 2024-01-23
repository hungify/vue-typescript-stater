import * as v from 'valibot'
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import type { Endpoints } from '#/types/endpoints'

// eslint-disable-next-line import/no-default-export
export default abstract class HttpRequest {
  #instance: AxiosInstance
  #accessToken: string

  public constructor(accessToken?: string, configs?: AxiosRequestConfig) {
    this.#accessToken = accessToken || ''
    this.#instance = axios.create({
      baseURL: configs?.baseURL ?? envVariables.viteBaseApi,
      ...configs,
    })
    this.initializeRequestInterceptor()
    this.initializeResponseInterceptor()
  }

  private initializeRequestInterceptor = () => {
    this.#instance.interceptors.request.use(this.handleRequest)
  }

  private handleRequest = (config: InternalAxiosRequestConfig) => {
    if (this.#accessToken) {
      config.headers.setAuthorization(`Bearer ${this.#accessToken}`)
    }
    return config
  }

  private initializeResponseInterceptor = () => {
    this.#instance.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    )
  }

  private handleResponse = (response: AxiosResponse) => {
    if (response.headers.authorization) {
      const accessToken = response.headers.authorization.split(' ')[1]
      if (accessToken) {
        this.#accessToken = accessToken
      }
    }
    return response.data
  }

  private handleError = (error: AxiosError) => {
    const originalRequest = error.config
    if (originalRequest && error.response?.status === 401) {
      // refresh token here
      return this.#instance(originalRequest)
    }
    throw error
  }

  public async axiosRequest<
    const Endpoint extends keyof Endpoints,
    Method extends Endpoints[Endpoint]['method'],
    QueryParams extends Endpoints[Endpoint]['queryParams'],
    ResponseSchema extends Endpoints[Endpoint]['schema']['response'],
    RequestDataSchema extends Endpoints[Endpoint]['schema']['body'],
    RequestQueryParamsSchema extends
      Endpoints[Endpoint]['schema']['queryParams'],
    ResponseOutput extends v.Output<ResponseSchema>,
  >({
    method,
    endpoint,
    requestData,
    requestSchema,
    responseSchema,
    config,
  }: {
    endpoint: Endpoint
    method: Method
    requestData: {
      data: RequestDataSchema extends v.BaseSchema
        ? v.Output<RequestDataSchema>
        : null
      queryParams: QueryParams
    }
    requestSchema: {
      data: RequestDataSchema
      queryParams: RequestQueryParamsSchema
    }
    responseSchema: ResponseSchema
    config?: AxiosRequestConfig
  }) {
    const axiosRequestConfig: AxiosRequestConfig = {
      ...config,
      method,
      url: normalizePath(endpoint),
      params: requestData.queryParams,
    }

    if (requestSchema.data) {
      Object.assign(axiosRequestConfig, { data: requestData.data })
      if (envVariables.prod) {
        const result = await v.safeParseAsync(
          requestSchema.data,
          requestData.data,
          {
            abortEarly: true,
            abortPipeEarly: true,
          },
        )
        if (!result.success) {
          console.error(result)
        }
      } else {
        await v.parseAsync(requestSchema.data, requestData.data, {
          abortEarly: true,
          abortPipeEarly: true,
        })
      }
    }

    if (requestSchema.queryParams) {
      if (envVariables.prod) {
        const result = await v.safeParseAsync(
          requestSchema.queryParams,
          requestData.queryParams,
          {
            abortEarly: true,
            abortPipeEarly: true,
          },
        )
        if (!result.success) {
          // report request error to the server
          console.error(result)
        }
      } else {
        await v.parseAsync(requestSchema.queryParams, requestData.queryParams, {
          abortEarly: true,
          abortPipeEarly: true,
        })
      }
    }

    const data = await this.#instance.request<unknown, ResponseOutput>(
      axiosRequestConfig,
    )

    if (responseSchema) {
      if (envVariables.prod) {
        const result = await v.safeParseAsync(responseSchema, data, {
          abortEarly: true,
          abortPipeEarly: true,
        })
        if (!result.success) {
          // request report error to server
          console.error(result)
        }
      }
      await v.parseAsync(responseSchema, data)
    }

    return data
  }

  public get instance() {
    return this.#instance
  }
}
