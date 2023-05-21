import { z } from 'zod';
import { createStrictSchema } from './base';

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
  getPosts: createStrictSchema(z.object({})),
  getPost: z.object({}).strict(),
};

export const postResSchema = {
  getPosts: postsSchema,
  getPost: postSchema,
};
