/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/auth/register': {
    post: operations['AuthController_register']
  }
  '/auth/resend-email': {
    post: operations['AuthController_resendEmail']
  }
  '/auth/verify': {
    get: operations['AuthController_verify']
  }
  '/auth/login': {
    post: operations['AuthController_login']
  }
  '/auth/refresh-token': {
    get: operations['AuthController_refreshToken']
  }
  '/auth/logout': {
    delete: operations['AuthController_logout']
  }
  '/auth/me': {
    get: operations['AuthController_me']
  }
  '/posts': {
    get: operations['PostsController_find']
    post: operations['PostsController_create']
  }
  '/posts/{postId}': {
    get: operations['PostsController_findOne']
    patch: operations['PostsController_update']
  }
  '/posts/{id}': {
    delete: operations['PostsController_remove']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    RegisterAuthDto: {
      /** @example example */
      fullName: string
      /** @example example@example.com */
      email: string
      /** @example example */
      password: string
    }
    MessageResponse: {
      message: string
    }
    LoginAuthDto: {
      /** @example example@example.com */
      email: string
      /** @example example */
      password: string
    }
    AuthTokenResponse: {
      /** @description The JWT token */
      idToken: string
      /** @description The access token */
      accessToken: string
      /** @description The refresh token */
      refreshToken: string
    }
    UserEntity: {
      /**
       * Format: date-time
       * @description createdAt
       */
      createdAt: string
      /**
       * Format: date-time
       * @description updatedAt
       */
      updatedAt: string
      /** @description createdBy */
      createdBy: string
      /**
       * @description The name of User
       * @example example
       */
      fullName: string
      /**
       * @description The email of User
       * @example example@gmail.com
       */
      email: string
      /**
       * @description The password of User
       * @example example
       */
      password: string
      /**
       * @description The verify code of User
       * @example example
       */
      isVerified: boolean
      /**
       * @description The role of User
       * @default user
       * @example user
       */
      role: string
    }
    CreatePostDto: {
      /**
       * @description The name of User
       * @example example
       */
      title: string
      /**
       * @description The content of the post
       * @example This is content of this post
       */
      content: string
      /**
       * @description The slug of the post
       * @example :this-is-a-post
       */
      slug: string
    }
    UpdatePostDto: {
      /**
       * @description The name of User
       * @example example
       */
      title?: string
      /**
       * @description The content of the post
       * @example This is content of this post
       */
      content?: string
      /**
       * @description The slug of the post
       * @example :this-is-a-post
       */
      slug?: string
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type $defs = Record<string, never>

export type external = Record<string, never>

export interface operations {
  AuthController_register: {
    requestBody: {
      content: {
        'application/json': components['schemas']['RegisterAuthDto']
      }
    }
    responses: {
      /** @description The user has been successfully created. */
      201: {
        content: {
          'application/json': components['schemas']['MessageResponse']
        }
      }
    }
  }
  AuthController_resendEmail: {
    parameters: {
      query: {
        email: string
      }
    }
    responses: {
      /** @description The email has been successfully sent. */
      200: {
        content: {
          'application/json': components['schemas']['MessageResponse']
        }
      }
    }
  }
  AuthController_verify: {
    parameters: {
      query: {
        token: string
      }
    }
    responses: {
      /** @description The user has been verified successfully */
      200: {
        content: {
          'application/json': components['schemas']['MessageResponse']
        }
      }
    }
  }
  AuthController_login: {
    requestBody: {
      content: {
        'application/json': components['schemas']['LoginAuthDto']
      }
    }
    responses: {
      /** @description The user has been login successfully */
      200: {
        content: {
          'application/json': components['schemas']['AuthTokenResponse']
        }
      }
    }
  }
  AuthController_refreshToken: {
    responses: {
      /** @description The user has been refresh token successfully */
      200: {
        content: {
          'application/json': components['schemas']['AuthTokenResponse']
        }
      }
    }
  }
  AuthController_logout: {
    responses: {
      /** @description The user has been logout successfully */
      200: {
        content: {
          'application/json': components['schemas']['MessageResponse']
        }
      }
    }
  }
  AuthController_me: {
    responses: {
      /** @description The user has been get successfully */
      200: {
        content: {
          'application/json': components['schemas']['UserEntity']
        }
      }
      /** @description Unauthorized */
      401: {
        content: never
      }
    }
  }
  PostsController_find: {
    responses: {
      200: {
        content: never
      }
    }
  }
  PostsController_create: {
    requestBody: {
      content: {
        'application/json': components['schemas']['CreatePostDto']
      }
    }
    responses: {
      /** @description The post has been successfully created. */
      201: {
        content: {
          'application/json': components['schemas']['CreatePostDto']
        }
      }
    }
  }
  PostsController_findOne: {
    parameters: {
      path: {
        postId: number
      }
    }
    responses: {
      200: {
        content: never
      }
    }
  }
  PostsController_update: {
    parameters: {
      path: {
        postId: number
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['UpdatePostDto']
      }
    }
    responses: {
      200: {
        content: never
      }
    }
  }
  PostsController_remove: {
    parameters: {
      path: {
        id: number
      }
    }
    responses: {
      200: {
        content: never
      }
    }
  }
}
