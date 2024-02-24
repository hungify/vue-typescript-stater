import type { paths } from '#/generated/api-schema'

export interface AuthOutput {
  loginRequest: paths['/auth/login']['post']['requestBody']['content']['application/json']
  registerRequest: paths['/auth/register']['post']['requestBody']['content']['application/json']

  loginResponse: paths['/auth/login']['post']['responses']['200']['content']['application/json']
  registerResponse: paths['/auth/register']['post']['responses']['201']['content']['application/json']
  refreshResponse: paths['/auth/refresh-token']['get']['responses']['200']['content']['application/json']
  logoutResponse: paths['/auth/logout']['delete']['responses']['200']['content']['application/json']
}
