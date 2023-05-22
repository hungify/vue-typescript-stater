export const enum AuthEndpoint {
  LOGIN = '/api/auth/login',
  REGISTER = '/api/auth/register',
  REFRESH_TOKEN = '/api/auth/refresh-token',
  LOGOUT = '/api/auth/logout',
}

export const enum PostEndpoint {
  GET_POSTS = '/posts?limit=10&page=0',
  GET_POST = '/posts/:postId',
}
