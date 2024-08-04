import { describe, it } from 'vitest'
import { createOpenFetch } from '../fetch'
import type { paths } from '#/generated/api-schema'

describe('fetch', () => {
  it('should fill path correctly', async () => {
    const $fetch = createOpenFetch<paths>({
      baseURL: 'https://api.example.com',
    })

    await $fetch('/auth/login', {
      method: 'POST',
      body: {
        email: 'admin@example.com',
        password: 'password',
      },
    })

    await $fetch('/posts/{postId}', {
      method: 'GET',
      path: {
        postId: 1,
      },
    })
  })
})
