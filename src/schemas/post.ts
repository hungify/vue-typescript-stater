import { createStrictSchema } from '#/utils/schema';
import { z } from 'zod';

const postSchema = createStrictSchema(
  z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean().optional(),
    body: z.string(),
  }),
);

const postsSchema = z.array(postSchema);

export const postReqSchema = {
  getPosts: createStrictSchema(
    z.object({
      limit: z.string(),
      page: z.string(),
    }),
  ),
};

export const postResSchema = {
  getPosts: postsSchema,
  getPost: postSchema,
};
