import { z } from 'zod';

export function makeResponseSchema<T extends z.ZodTypeAny>(schema: T) {
  return z.object({
    status: z.number(),
    message: z.string(),
    data: schema,
  });
}
