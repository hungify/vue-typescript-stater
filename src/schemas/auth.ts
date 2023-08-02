import { z } from 'zod'

const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string()
})

const registerRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2)
})

const registerResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string()
})

const refreshRequestSchema = z.object({})

const refreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string()
})

const logoutRequestSchema = z.object({})

const logoutResponseSchema = z.object({
  message: z.string()
})

export const authSchemaRequest = {
  login: loginRequestSchema,
  register: registerRequestSchema,
  refresh: refreshRequestSchema,
  logout: logoutRequestSchema
}

export const authSchemaResponse = {
  login: loginResponseSchema,
  register: registerResponseSchema,
  refresh: refreshResponseSchema,
  logout: logoutResponseSchema
}
