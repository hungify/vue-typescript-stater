import type * as v from 'valibot'
import type { PostEndpoint } from '#/enums/endpoint'
import type { postSchema } from '#/schemas/post'
import type { Operation } from './endpoints'
import type { postService } from '#/services/post'

export interface PostOutput {
  GetPostsResponse: v.Output<typeof postSchema.getPostsResponse>
  GetPostsRequest: v.Output<typeof postSchema.getPostsParams>
  GetPostsParams: v.Output<typeof postSchema.getPostsParams>

  GetPostResponse: v.Output<typeof postSchema.getPostResponse>

  Post: v.Output<typeof postSchema.post>
}

export interface PostEndpoints {
  [PostEndpoint.GET_POSTS]: Operation<
    PostEndpoint.GET_POSTS,
    PostOutput['GetPostsResponse'],
    null
  >

  [PostEndpoint.GET_POST]: Operation<
    PostEndpoint.GET_POST,
    PostOutput['GetPostResponse'],
    null
  >
}

export type PostServiceType = typeof postService
