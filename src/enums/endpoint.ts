export const enum AuthEndpoint {
  LOGIN = '/api/auth/login',
  REGISTER = '/api/auth/register',
  REFRESH_TOKEN = '/api/auth/refresh-token',
  LOGOUT = '/api/auth/logout'
}

export const enum PostEndpoint {
  GET_POSTS = '/posts?limit=limit&page=page&search=?search', // add ? in front of query params field to make it optional, otherwise don't add it to make it required
  GET_POST = '/posts/:postId'
}
