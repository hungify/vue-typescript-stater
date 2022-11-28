import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import type { LoginRequest, RegisterRequest } from '~/interfaces/auth';
import type { FormError } from '~/interfaces/error';
import { AuthService } from '~/services/auth';

export const useAuthStore = defineStore('auth', () => {
  const authService = new AuthService();

  const token = ref({
    accessToken: '',
    refreshToken: '',
  });
  const formError = ref<FormError>();

  const login = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      token.value = response;
    } catch (err) {
      if (err instanceof AxiosError && err.status === 422) {
        formError.value = err.response?.data;
      }
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await authService.register(data);
      token.value = response;
    } catch (err) {
      if (err instanceof AxiosError && err.status === 422) {
        formError.value = err.response?.data;
      }
    }
  };

  const refreshToken = async () => {
    const response = await authService.refreshToken();
    token.value = response;
  };

  const logout = async () => {
    const response = await authService.logout();
    // Toast message here
    console.log(response);
  };

  return {
    token,
    formError,

    login,
    register,
    refreshToken,
    logout,
  };
});
