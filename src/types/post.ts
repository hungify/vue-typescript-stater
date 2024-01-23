import type { PostEndpoint } from '#/enums/endpoint'
import type { postSchema } from '#/schemas/post'
import * as v from 'valibot'
import type { Operation } from './endpoints'

export namespace PostOutput {
  export type GetPostsResponse = v.Output<typeof postSchema.getPostsResponse>
  export type GetPostsRequest = v.Output<typeof postSchema.getPostsParams>
  export type GetPostsParams = v.Output<typeof postSchema.getPostsParams>

  export type GetPostResponse = v.Output<typeof postSchema.getPostResponse>
}

export interface PostEndpoints {
  [PostEndpoint.GET_POSTS]: Operation<
    PostEndpoint.GET_POSTS,
    PostOutput.GetPostsResponse,
    null
  >

  [PostEndpoint.GET_POST]: Operation<
    PostEndpoint.GET_POST,
    PostOutput.GetPostResponse,
    null
  >
}
