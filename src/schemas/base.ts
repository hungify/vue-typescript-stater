import type { z } from 'zod';

export const createStrictSchema = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  schema.strict();
