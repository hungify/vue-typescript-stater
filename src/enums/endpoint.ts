export const enum AuthEndpoint {
  LOGIN = '/api/auth/login',
  REGISTER = '/api/auth/register',
  REFRESH_TOKEN = '/api/auth/refresh-token',
  LOGOUT = '/api/auth/logout'
}

export const enum PostEndpoint {
  GET_POSTS = '/posts?[limit:number]&[page:number]&[search:?string]', // ? means optional
  GET_POST = '/posts/[postId:number]'
}
