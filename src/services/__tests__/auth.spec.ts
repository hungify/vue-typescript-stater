import { describe, expect, it, vi } from 'vitest'
import AuthService from '../auth'

describe('AuthService', () => {
  let authService: AuthService | null = null

  beforeEach(() => {
    authService = new AuthService()
  })

  it('should login successfully', async () => {
    // Mock the axiosRequest method to return a successful response
    authService!.axiosRequest = vi.fn().mockResolvedValue({ success: true })

    const loginRequest = { email: 'testuser', password: 'testpassword' }
    const response = await authService!.login(loginRequest)

    expect(authService!.axiosRequest).toHaveBeenCalledWith({
      method: 'POST',
      endpoint: 'login',
      requestData: {
        data: loginRequest,
        queryParams: null,
      },
      requestSchema: {
        data: null,
        queryParams: null,
      },
      responseSchema: null,
    })
    expect(response).toEqual({ success: true })
  })

  it('should register successfully', async () => {
    // Mock the axiosRequest method to return a successful response
    authService!.axiosRequest = vi.fn().mockResolvedValue({ success: true })

    const registerRequest = {
      email: 'testuser',
      password: 'testpassword',
      name: 'testname',
    }
    const response = await authService!.register(registerRequest)

    expect(authService!.axiosRequest).toHaveBeenCalledWith({
      method: 'POST',
      endpoint: 'register',
      requestData: {
        data: registerRequest,
        queryParams: null,
      },
      requestSchema: {
        data: null,
        queryParams: null,
      },
      responseSchema: null,
    })
    expect(response).toEqual({ success: true })
  })

  it('should refresh token successfully', async () => {
    // Mock the axiosRequest method to return a successful response
    authService!.axiosRequest = vi.fn().mockResolvedValue({ success: true })

    const response = await authService!.refreshToken()

    expect(authService!.axiosRequest).toHaveBeenCalledWith({
      method: 'GET',
      endpoint: 'refreshToken',
      requestData: {
        data: null,
        queryParams: null,
      },
      requestSchema: {
        data: null,
        queryParams: null,
      },
      responseSchema: null,
    })
    expect(response).toEqual({ success: true })
  })

  it('should logout successfully', async () => {
    // Mock the axiosRequest method to return a successful response
    authService!.axiosRequest = vi.fn().mockResolvedValue({ success: true })

    const response = await authService!.logout()

    expect(authService?.axiosRequest).toHaveBeenCalledWith({
      method: 'DELETE',
      endpoint: 'logout',
      requestData: {
        data: null,
        queryParams: null,
      },
      requestSchema: {
        data: null,
        queryParams: null,
      },
      responseSchema: null,
    })
    expect(response).toEqual({ success: true })
  })
})
