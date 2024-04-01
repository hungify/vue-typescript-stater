import { type MockedFunction, describe, expect, it, vi } from 'vitest'
import { useRoute, useRouter } from 'vue-router'
import { useSyncQueryUrl } from '../use-sync-query-url'

vi.mock('vue-router')

const mockUseRouter = useRouter as MockedFunction<typeof useRouter>
const mockUseRoute = useRoute as MockedFunction<typeof useRoute>

describe('useSyncQueryUrl', () => {
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

  it('should call router.replace with updated query', () => {
    const { onSyncQueryUrl } = useSyncQueryUrl('/')

    onSyncQueryUrl({ name: 'Alice', age: '30' })

    expect(mockUseRouter().replace).toHaveBeenCalledWith(
      '/example?name=Alice&age=30',
    )
  })

  it('should call router.push with updated query', () => {
    const { onSyncQueryUrl } = useSyncQueryUrl('/')

    onSyncQueryUrl({ name: 'Bob', age: '40' }, 'push')

    expect(mockUseRouter().push).toHaveBeenCalledWith(
      '/example?name=Bob&age=40',
    )
  })

  it('should call router.replace with undefined values removed from query', () => {
    const { onSyncQueryUrl } = useSyncQueryUrl('/')

    onSyncQueryUrl({ name: undefined, age: '50' })

    expect(mockUseRouter().replace).toHaveBeenCalledWith('/example?age=50')
  })

  it('should call router.replace with null values persisted in query', () => {
    const { onSyncQueryUrl } = useSyncQueryUrl('/')

    onSyncQueryUrl({ name: null, age: '50' } as any)

    expect(mockUseRouter().replace).toHaveBeenCalledWith('/example?name&age=50')
  })
})
