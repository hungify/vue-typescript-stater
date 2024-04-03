import { type MockedFunction, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { useRouteQuery } from '../use-route-query'

vi.mock('vue-router')

const mockUseRoute = useRoute as MockedFunction<typeof useRoute>
const mockUseRouter = useRouter as MockedFunction<typeof useRouter>

describe('useRouteQuery', () => {
  beforeEach(() => {
    mockUseRoute.mockReturnValue({
      path: '/example',
      query: { name: 'John', age: '20' },
      fullPath: '/?name=John&age=20',
    } as any)

    mockUseRouter.mockReturnValue({
      push: vi.fn(),
      replace: vi.fn(),
    } as any)
  })
  it('should update route query when route changes', () => {
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

    const { routeQuery, reset, debounce } = useRouteQuery({
      name: '/',
      ms: 500,
      method: 'replace',
    })

    // Assert initial values
    expect(routeQuery.value).toEqual({ name: 'John', age: '20' })

    // Call reset and assert values
    reset()
    expect(routeQuery.value).toEqual({})

    // Call debounce and assert values
    debounce({ param1: 'newvalue1', param2: 'newvalue2' })
    setTimeout(() => {
      expect(routeQuery.value).toEqual({
        param1: 'newvalue1',
        param2: 'newvalue2',
      })
    }, 500)
  })
})
