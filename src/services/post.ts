import { PostEndpoint } from '#/enums/endpoint'
import type { AxiosRequestConfig } from 'axios'
import HttpRequest from './http'
import { postSchema } from '#/schemas/post'

export class PostService extends HttpRequest {
  public getPosts(config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'GET',
      endpoint: PostEndpoint.GET_POSTS,
      responseSchema: postSchema.getPostsResponse,
      requestSchema: {
        queryParams: postSchema.getPostsParams,
        data: null,
      },
      requestData: {
        queryParams: {
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
      endpoint: makePathParams(PostEndpoint.GET_POST, {
        postId: id,
      }),
      responseSchema: postSchema.getPostResponse,
      requestSchema: {
        queryParams: null,
        data: null,
      },
      requestData: {
        queryParams: null,
        data: null,
      },
      config,
    })
  }
}
