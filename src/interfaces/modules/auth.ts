import { AuthEndpoint } from '~/constants/endpoint';

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}
export interface RefreshTokenRequest {
  refreshToken: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export type AuthByEndpoint<Type extends 'request' | 'response'> = {
  [AuthEndpoint.Login]: Type extends 'request' ? LoginRequest : LoginResponse;
  [AuthEndpoint.Register]: Type extends 'request' ? RegisterRequest : never;
  [AuthEndpoint.RefreshToken]: Type extends 'request' ? RefreshTokenRequest : RefreshTokenResponse;
};
