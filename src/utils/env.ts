import * as v from 'valibot'

const envSchema = v.object({
  // base
  baseUrl: v.string(),
  dev: v.boolean(),
  mode: v.union([
    v.literal('development'),
    v.literal('production'),
    v.literal('test'),
    v.literal('staging'),
  ]),

  prod: v.boolean(),
  ssr: v.boolean(),

  // custom
  viteBaseApi: v.string(),
})

type EnvVariables = v.Output<typeof envSchema>

type Mode = 'development' | 'production' | 'test' | 'staging'

export const envVariables = {
  // base
  baseUrl: import.meta.env.BASE_URL,
  dev: import.meta.env.DEV,
  mode: import.meta.env.MODE as Mode,
  prod: import.meta.env.PROD,
  ssr: import.meta.env.SSR,

  // custom
  viteBaseApi: import.meta.env.VITE_BASE_API,
} as EnvVariables

export const loadEnvVariables = () => {
  v.parse(envSchema, envVariables)
}
