import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import type { FormError } from '#/types/error'
import type { AuthOutput } from '#/types/auth'
import { authService } from '#/services/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref({
    accessToken: '',
    refreshToken: '',
  })
  const formError = ref<FormError>()

  const login = async (data: AuthOutput['LoginRequest']) => {
    try {
      const response = await authService.login(data)
      token.value = response
    } catch (error) {
      if (error instanceof AxiosError && error.status === 422) {
        formError.value = error.response?.data
      }
    }
  }

  const register = async (data: AuthOutput['RegisterRequest']) => {
    try {
      const response = await authService.register(data)
      token.value = response
    } catch (error) {
      if (error instanceof AxiosError && error.status === 422) {
        formError.value = error.response?.data
      }
    }
  }

  const refreshToken = async () => {
    const response = await authService.refreshToken()
    token.value = response
  }

  const logout = async () => {
    const response = await authService.logout()
    // Toast message here
    console.log(response)
  }

  return {
    token,
    formError,

    login,
    register,
    refreshToken,
    logout,
  }
})
