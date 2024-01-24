import { stringReplacement } from '../string'
import { describe, it, expect } from 'vitest'

describe('stringReplacement', () => {
  it('replaces matching patterns with corresponding replacements', () => {
    const input = 'Hello {name}, welcome to {city}!'
    const replacements = {
      name: 'John',
      city: 'New York',
    }
    const pattern = /\{([^}]+)\}/g

    const result = stringReplacement({ input, replacements, pattern })

    expect(result).toBe('Hello John, welcome to New York!')
  })

  it('returns the input string if no matching patterns found', () => {
    const input = 'Hello world!'
    const replacements = {
      '{name}': 'John',
      '{city}': 'New York',
    }
    const pattern = /\{([^}]+)\}/g

    const result = stringReplacement({ input, replacements, pattern })

    expect(result).toEqual('Hello world!')
  })
})
