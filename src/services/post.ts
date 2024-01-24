import HttpRequest from './http'
import type { AxiosRequestConfig } from 'axios'
import { PostEndpoint } from '#/enums/endpoint'
import { postSchema } from '#/schemas/post'

class PostService extends HttpRequest {
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
          _limit: 10,
          _start: 1,
        },
        data: null,
      },
      config,
    })
  }
  public getPost(id: number, config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'GET',
      endpoint: makePathParams({
        endpoint: PostEndpoint.GET_POST,
        params: {
          postId: id,
        },
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

export const postService = new PostService()
