import { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { AuthEndpoint } from '~/constants/endpoint';
import type { FormError } from '~/interfaces/error';
import type { LoginRequest, RegisterRequest } from '~/interfaces/modules/auth';
import { AuthRequest } from '~/services/auth';

export const useAuthStore = defineStore('auth', () => {
  const authRequest = new AuthRequest();

  const token = ref({
    accessToken: '',
    refreshToken: '',
  });
  const formError = ref<FormError>();

  const login = async (data: LoginRequest) => {
    try {
      const response = await authRequest.execute(AuthEndpoint.Login, data);
      token.value = response.data;
    } catch (err) {
      if (err instanceof AxiosError && err.status === 422) {
        formError.value = err.response?.data;
      }
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await authRequest.execute(AuthEndpoint.Login, data);
      token.value = {
        ...response.data,
      };
    } catch (err) {
      if (err instanceof AxiosError && err.status === 422) {
        formError.value = err.response?.data;
      }
    }
  };

  const refreshToken = async () => {
    const response = await authRequest.execute(AuthEndpoint.RefreshToken, {
      refreshToken: token.value.refreshToken,
    });
    token.value = response.data;
  };

  return {
    token,
    formError,

    login,
    register,
    refreshToken,
  };
});
