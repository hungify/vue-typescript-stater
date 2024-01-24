import { describe, it, expect } from 'vitest'
import { toPromise } from '../promise'

describe('toPromise', () => {
  it('resolves with data when promise resolves', async () => {
    const mockData = { id: 1, title: 'Test' }
    const mockPromise = Promise.resolve(mockData)

    const [error, data] = await toPromise(mockPromise)

    expect(error).toBeNull()
    expect(data).toEqual(mockData)
  })

  it('rejects with error when promise rejects', async () => {
    const mockError = new Error('Test error')
    const mockPromise = Promise.reject(mockError)

    const [error, data] = await toPromise(mockPromise)

    expect(error).toEqual(mockError)
    expect(data).toBeUndefined()
  })

  it('returns error with additional properties when errorExt is provided', async () => {
    const mockError = new Error('Test error')
    const errorExt = { additionalProperty: 'value' }
    const mockPromise = Promise.reject(mockError)

    const [error, data] = await toPromise(mockPromise, errorExt)

    expect(error).toEqual({ ...mockError, ...errorExt })
    expect(data).toBeUndefined()
  })

  it('returns error response data when error is an Axios error', async () => {
    const mockError = {
      response: {
        data: { errorMessage: 'Test error' },
      },
    }
    const mockPromise = Promise.reject(mockError)

    const [error, data] = await toPromise(mockPromise)

    expect(error).toEqual(mockError)
    expect(data).toBeUndefined()
  })
})
