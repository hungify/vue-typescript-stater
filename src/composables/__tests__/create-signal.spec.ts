import { describe, it, expect } from 'vitest'

describe('createSignal', () => {
  it('should return the initial value', () => {
    const initialValue = 10
    const [get] = createSignal(initialValue)
    expect(get()).toBe(initialValue)
  })

  it('should update the value when set is called', () => {
    const initialValue = 10
    const newValue = 20
    const [get, set] = createSignal(initialValue)
    set(newValue)
    expect(get()).toBe(newValue)
  })

  it('should update the value using a function', () => {
    const initialValue = 10
    const increment = (prev: number) => prev + 1
    const [get, set] = createSignal(initialValue)
    set(increment)
    expect(get()).toBe(initialValue + 1)
  })

  it('should trigger a reactivity update when options.equals is false', () => {
    const initialValue = { count: 0 }
    const newValue = { count: 1 }
    const [get, set] = createSignal(initialValue, { equals: false })
    set(newValue)
    expect(get()).toBe(newValue)
    expect(get()).not.toBe(initialValue)
  })
})
