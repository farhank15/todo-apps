import { describe, it, expect } from 'vitest'
import { add, subtract, multiply, divide } from '../utils/math'

describe('math utilities', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('subtracts two numbers', () => {
    expect(subtract(10, 4)).toBe(6)
  })

  it('multiplies two numbers', () => {
    expect(multiply(3, 4)).toBe(12)
  })

  it('divides two numbers', () => {
    expect(divide(10, 2)).toBe(5)
  })

  it('throws on division by zero', () => {
    expect(() => divide(5, 0)).toThrow('Cannot divide by zero')
  })
})
