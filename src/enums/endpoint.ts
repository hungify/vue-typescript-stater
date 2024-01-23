export enum AuthEndpoint {
  LOGIN = 'POST /api/auth/login',
  REGISTER = 'POST /api/auth/register',
  REFRESH_TOKEN = 'GET /api/auth/refresh-token',
  LOGOUT = 'DELETE /api/auth/logout',
}

export enum PostEndpoint {
  GET_POSTS = 'GET /posts?[limit:number]&[page:number]', // ? means optional
  GET_POST = 'GET /posts/[postId:number]',
}
