export enum AuthEndpoint {
  LOGIN = 'POST /api/auth/login',
  REGISTER = 'POST /api/auth/register',
  REFRESH_TOKEN = 'GET /api/auth/refresh-token',
  LOGOUT = 'DELETE /api/auth/logout',
}

export enum PostEndpoint {
  GET_POSTS = 'GET /posts?[_start:number]&[_limit:number]', // ? means optional
  GET_POST = 'GET /posts/[postId:number]',
}
