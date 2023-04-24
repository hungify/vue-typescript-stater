/* eslint-disable no-restricted-properties */
import { z } from 'zod';

const envSchema = z.object({
  // base
  baseUrl: z.string().min(1),
  dev: z.boolean(),
  mode: z
    .literal('development')
    .or(z.literal('production'))
    .or(z.literal('test'))
    .or(z.literal('staging')),
  prod: z.boolean(),
  ssr: z.boolean(),

  // custom
  viteBaseApi: z.string().min(1).url(),
});

type EnvVariables = z.infer<typeof envSchema>;

type Mode = 'development' | 'production' | 'test' | 'staging';

export const envVariables = {
  // base
  baseUrl: import.meta.env.BASE_URL,
  dev: import.meta.env.DEV,
  mode: import.meta.env.MODE as Mode,
  prod: import.meta.env.PROD,
  ssr: import.meta.env.SSR,

  // custom
  viteBaseApi: import.meta.env.VITE_BASE_API,
} as EnvVariables;

export const loadEnvVariables = () => {
  envSchema.parse(envVariables);
};
