import { PostEndpoint } from '#/enums/endpoint';
import { postReqSchema, postResSchema } from '#/schemas/post';
import { makeURLPath } from '#/utils/axios';
import type { AxiosRequestConfig } from 'axios';
import HttpRequest from './http';

export class PostService extends HttpRequest {
  public getPosts(config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'GET',
      path: makeURLPath(PostEndpoint.GET_POSTS, null),
      responseSchema: postResSchema.getPosts,
      requestSchema: {
        params: postReqSchema.getPosts,
        data: null,
      },
      requestData: {
        params: {
          limit: '10',
          page: '0',
        },
        data: null,
      },
      config,
    });
  }
  public getPost(id: number, config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'GET',
      path: makeURLPath(PostEndpoint.GET_POST, {
        postId: id.toString(),
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
    });
  }
}
