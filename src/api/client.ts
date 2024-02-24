import createClient from 'openapi-fetch'
import type { paths } from '#/generated/api-schema'

export const client = createClient<paths>({ baseUrl: envVariables.viteBaseApi })
