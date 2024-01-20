import { PostEndpoint } from '#/enums/endpoint'
import { postReqSchema, postResSchema } from '#/schemas/post'
import type { AxiosRequestConfig } from 'axios'
import HttpRequest from './http'
import { makePathParams } from '#/utils/http'

export class PostService extends HttpRequest {
  public getPosts(config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'GET',
      path: makePathParams(PostEndpoint.GET_POSTS, {}),
      responseSchema: postResSchema.getPosts,
      requestSchema: {
        params: postReqSchema.getPosts,
        data: null,
      },
      requestData: {
        params: {
          limit: 10,
          page: 1,
        },
        data: null,
      },
      config,
    })
  }
  public getPost(id: number, config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'GET',
      path: makePathParams(PostEndpoint.GET_POST, {
        postId: id,
      }),
      responseSchema: postResSchema.getPost,
      requestSchema: {
        params: null,
        data: null,
      },
      requestData: {
        params: null,
        data: null,
      },
      config,
    })
  }
}
