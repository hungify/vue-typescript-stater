import type { AllEndpoint } from '#/types/endpoint'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
} from 'axios'
import axios from 'axios'
import * as v from 'valibot'

interface HttpRequestConfig<TParams, TData> extends AxiosRequestConfig {
  data?: TData
  params?: TParams
}

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
    if (response.headers && response.headers.authorization) {
      const accessToken = response.headers.authorization.split(' ')[1]
      if (accessToken) {
        this.#accessToken = accessToken
      }
    }
    return response
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
    TPath extends AllEndpoint,
    TResponseSchema extends v.UnknownSchema = v.UnknownSchema,
    TRequestDataSchema extends v.UnknownSchema = v.UnknownSchema,
    TRequestParamsSchema extends v.UnknownSchema = v.UnknownSchema,
  >({
    method,
    path,
    requestSchema,
    responseSchema,
    requestData,
    config,
  }: {
    path: TPath
    method: Method
    requestData: {
      data: v.Output<TRequestDataSchema>
      params: TRequestParamsSchema
    }
    requestSchema: {
      data: TRequestDataSchema
      params: TRequestParamsSchema
    }
    responseSchema: TResponseSchema
    config?: AxiosRequestConfig
  }) {
    const axiosRequestConfig: AxiosRequestConfig = {
      ...config,
      method,
      url: normalizePath(path),
      params: requestData.params,
    }

    if (requestSchema.data) {
      Object.assign(axiosRequestConfig, { data: requestData.data })
      if (envVariables.prod) {
        const result = await v.safeParseAsync(
          requestSchema.data,
          requestData.data,
        )
        if (!result.success) {
          console.error(result)
        }
      } else {
        const res = await v.parseAsync(requestSchema.data, requestData.data)
        console.log(res)
      }
    }

    if (requestSchema.params) {
      if (envVariables.prod) {
        const result = await v.safeParseAsync(
          requestSchema.params,
          requestData.params,
        )
        if (!result.success) {
          // report request error to the server
          console.error(result)
        }
      } else {
        const res = await v.parseAsync(requestSchema.params, requestData.params)
        console.log(res)
      }
    }

    const { data } = await this.#instance.request(axiosRequestConfig)

    if (responseSchema) {
      if (envVariables.prod) {
        const result = await v.safeParseAsync(responseSchema, data)
        if (!result.success) {
          // request report error to server
          console.error(result)
        }
      }
      const res = await v.parseAsync(responseSchema, data)

      console.error(res)
    }

    return data
  }

  public get instance() {
    return this.#instance
  }
}
