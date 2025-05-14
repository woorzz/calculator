import { describe, it, expect } from 'vitest'
import { add, subtract, multiply, divide } from '../../services/calculator.js'

describe('add', () => {
  it('should return the sum of two positive numbers', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('should return the sum of a positive and a negative number', () => {
    expect(add(5, -3)).toBe(2)
  })

  it('should return the sum of two negative numbers', () => {
    expect(add(-2, -3)).toBe(-5)
  })

  it('should return 0 when adding 0 and 0', () => {
    expect(add(0, 0)).toBe(0)
  })

  it('should handle floating point precision', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3)
  })
})

describe('subtract', () => {
  it('should return the difference of two positive numbers', () => {
    expect(subtract(5, 3)).toBe(2)
  })

  it('should return the difference of a positive and a negative number', () => {
    expect(subtract(5, -3)).toBe(8)
  })

  it('should return the difference of two negative numbers', () => {
    expect(subtract(-5, -3)).toBe(-2)
  })

  it('should return 0 when subtracting a number from itself', () => {
    expect(subtract(5, 5)).toBe(0)
  })

  it('should handle large numbers', () => {
    expect(subtract(1e12, 1e6)).toBe(999999000000)
  })
})

describe('multiply', () => {
  it('should return the product of two positive numbers', () => {
    expect(multiply(2, 3)).toBe(6)
  })

  it('should return the product of a positive and a negative number', () => {
    expect(multiply(5, -3)).toBe(-15)
  })

  it('should return the product of two negative numbers', () => {
    expect(multiply(-2, -3)).toBe(6)
  })

  it('should return 0 when multiplying by 0', () => {
    expect(multiply(5, 0)).toBe(0)
  })

  it('should handle floating point multiplication', () => {
    expect(multiply(0.2, 0.3)).toBeCloseTo(0.06)
  })
})

describe('divide', () => {
  it('should return the quotient of two positive numbers', () => {
    expect(divide(6, 3)).toBe(2)
  })

  it('should return the quotient of a positive and a negative number', () => {
    expect(divide(5, -5)).toBe(-1)
  })

  it('should return the quotient of two negative numbers', () => {
    expect(divide(-6, -3)).toBe(2)
  })

  it('should throw an error when dividing by 0', () => {
    expect(() => divide(5, 0)).toThrow('Cannot divide by zero')
  })

  it('should return decimal values', () => {
    expect(divide(1, 4)).toBeCloseTo(0.25)
  })
})

describe('combined operations', () => {
  it(' (2 + 3) * (4 - 1) - (10 / 2) = 10', () => {
    const sum = add(2, 3)
    const diff = subtract(4, 1)
    const prod = multiply(sum, diff)
    const quot = divide(10, 2)
    const result = subtract(prod, quot)
    expect(result).toBe(10)
  })

  it('should handle decimals correctly in a complex expression', () => {
    const result = divide(multiply(add(0.1, 0.2), 10), 2)
    expect(result).toBeCloseTo(1.5)
  })

  it('should handle negative numbers in combined operations', () => {
    const result = add(multiply(-2, 3), divide(9, -3))
    expect(result).toBe(-9)
  })
})
