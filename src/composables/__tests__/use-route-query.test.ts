import { type MockedFunction, describe, expect, it, vi } from 'vitest'
import { useRoute } from 'vue-router'
import { useRouteQuery } from '../use-route-query'

vi.mock('vue-router')

const mockUseRoute = useRoute as MockedFunction<typeof useRoute>

describe('useRouteQuery', () => {
  mockUseRoute.mockReturnValue({
    fullPath: '/?name=John&age=20',
    query: { name: 'John', age: '20' },
    hash: '',
    params: {},
    matched: [],
    meta: {},
    name: '/',
    path: '/',
    redirectedFrom: undefined,
  })

  it('should return valRouteQuery and fnRouteQuery', () => {
    const { valRouteQuery, fnRouteQuery } = useRouteQuery()

    expect(valRouteQuery.value).toEqual({ name: 'John', age: '20' })

    expect(fnRouteQuery.value).toEqual({
      name: expect.any(Function),
      age: expect.any(Function),
    })
    expect(fnRouteQuery.value.name()).toBe('John')
    expect(fnRouteQuery.value.age()).toBe('20')
  })
})
