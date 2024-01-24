import * as v from 'valibot'

export const envSchema = v.object({
  baseUrl: v.string(),
  dev: v.boolean(),
  mode: v.picklist(['development', 'production', 'test', 'staging']),
  prod: v.boolean(),
  ssr: v.boolean(),

  // custom
  viteBaseApi: v.string('Not set VITE_BASE_API', [
    v.url("VITE_BASE_API isn't a valid url"),
  ]),
})
