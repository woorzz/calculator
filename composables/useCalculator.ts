export function add(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number') return NaN
  return a + b
}

export function subtract(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number') return NaN
  return a - b
}

export function multiply(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number') return NaN
  return a * b
}

export function divide(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number') return NaN
  if (b === 0) throw new Error('Cannot divide by zero')
  return a / b
}
