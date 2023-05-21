import { PostEndpoint } from '#/enums/endpoint';
import HttpRequest from './http';
import { postReqSchema, postResSchema } from '#/schemas/post';
import type { AxiosRequestConfig } from 'axios';
import { makeURLPath } from '#/utils/axios';

export class PostService extends HttpRequest {
  public getPosts(config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'GET',
      path: makeURLPath(PostEndpoint.GET_POSTS, {}),
      responseSchema: postResSchema.getPosts,
      requestData: {},
      requestSchema: postReqSchema.getPosts,
      config,
    });
  }
  public getPost(id: number, config?: AxiosRequestConfig) {
    return this.axiosRequest({
      method: 'GET',
      path: makeURLPath(PostEndpoint.GET_POST, {
        id: id.toString(),
      }),
      responseSchema: postResSchema.getPost,
      requestSchema: postReqSchema.getPost,
      requestData: {},
      config,
    });
  }
}
