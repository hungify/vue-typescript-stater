import * as v from 'valibot'
import { envSchema } from '#/schemas/env'

type EnvVariables = v.Output<typeof envSchema>

export const envVariables = {
  // base
  baseUrl: import.meta.env.BASE_URL,
  dev: import.meta.env.DEV,
  mode: import.meta.env.MODE as EnvVariables['mode'],
  prod: import.meta.env.PROD,
  ssr: import.meta.env.SSR,

  // custom
  viteBaseApi: import.meta.env.VITE_BASE_API,
} satisfies EnvVariables

export const loadEnvVariables = () => {
  v.parse(envSchema, envVariables)
}
