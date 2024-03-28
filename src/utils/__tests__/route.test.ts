import { describe, expect, it } from 'vitest'
import { getRouteQuery } from '../route'

describe('getRouteQuery', () => {
  it('should return an object with string values when kind is "val"', () => {
    const query = {
      key1: 123,
      key2: 'abc',
    }
    type Query = typeof query

    const result = getRouteQuery<Query>(query)('val')
    expect(result).toEqual({
      key1: '123',
      key2: 'abc',
    })
  })

  it('should return an object with number conversion functions when kind is not "val"', () => {
    const query = {
      key1: 123,
      key2: 'abc',
    }
    const result = getRouteQuery(query)('fn')
    expect(result).toEqual({
      key1: expect.any(Function),
      key2: expect.any(Function),
    })

    // Test the conversion functions
    expect(result.key1()).toBe(123)
    expect(result.key2()).toBeNaN()
  })
})
