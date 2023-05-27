import { createImageSchema, createStrictSchema } from '#/utils/schema';
import { z } from 'zod';

const postSchema = createStrictSchema({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean().optional(),
  body: z.string(),
});

const createPostSchema = createStrictSchema({
  userId: z.number(),
  title: z.string(),
  body: z.string(),
  image: createImageSchema({
    mineType: {
      value: ['image/jpeg', 'image/png', 'image/jpg'],
    },
  }),
});

export const postReqSchema = {
  getPosts: createStrictSchema({
    limit: z.string(),
    page: z.string(),
  }),
};

export const postResSchema = {
  getPosts: z.array(postSchema),
  getPost: postSchema,
  createPost: createPostSchema,
};
