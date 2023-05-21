import type { z } from 'zod';
import type { postResSchema } from '#/schemas/post';

export type Post = z.infer<typeof postResSchema.getPost>;
