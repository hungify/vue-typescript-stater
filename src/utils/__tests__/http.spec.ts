import { describe, it, expect } from 'vitest'
import { makePathParams, normalizePath } from '../http'

describe('makePathParams', () => {
  it('should return the correct URL without path params', () => {
    const endpoint = 'GET /api/users'
    const result = makePathParams({ endpoint })
    expect(result).toBe('/api/users')
  })

  it('should replace path params with provided values', () => {
    const endpoint = 'GET /api/users/[id:number]/[name:string]'
    const params = { id: 123, name: 'john' }
    const result = makePathParams({ endpoint, params })
    expect(result).toBe('/api/users/123/john')
  })

  it('should ignore unused path params', () => {
    const endpoint = 'GET /api/users/[id:number]/[name:string]'
    const params = { id: 123, name: 'john', age: 25 }
    const result = makePathParams({ endpoint, params })
    expect(result).toBe('/api/users/123/john')
  })

  it('should handle special characters in path params', () => {
    const endpoint = 'GET /api/users/[name:string]/[email:string]'
    const params = { name: 'john doe', email: 'john.doe@example.com' }
    const result = makePathParams({ endpoint, params })
    expect(result).toBe('/api/users/john%20doe/john.doe%40example.com')
  })
})

describe('normalizePath', () => {
  it('should return the correct normalized path for endpoints with query parameters', () => {
    const endpoint = 'GET /api/posts?[_start:number]&[_limit:number]'
    const result = normalizePath(endpoint)
    expect(result).toBe('/api/posts')
  })

  it('should return the correct normalized path for endpoints without query parameters', () => {
    const endpoint = 'GET /api/users'
    const result = normalizePath(endpoint)
    expect(result).toBe('/api/users')
  })

  it('should return the correct normalized path for endpoints with path parameters', () => {
    const endpoint = '/api/users/123/john'
    const result = normalizePath(endpoint)
    expect(result).toBe('/api/users/123/john')
  })
})

describe('combined functions', () => {
  it('Should return the correct normalized path for endpoints with query parameters', () => {
    const endpoint = 'GET /api/users/[id:number]/[name:string]'
    const params = { id: 123, name: 'john' }
    const pathParamsResult = makePathParams({ endpoint, params })
    const normalizePathResult = normalizePath(pathParamsResult)
    expect(normalizePathResult).toBe('/api/users/123/john')
  })
})
