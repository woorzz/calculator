// tests/unit/history.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useCalculator } from '~/composables/useCalculator'

beforeEach(() => {
  localStorage.clear()
})

describe('Calculator history', () => {
  it('should add a new entry to history', () => {
    const calc = useCalculator()
    calc.loadInitialHistory()

    calc.append('2')
    calc.selectOperator('+')
    calc.append('3')
    calc.calculate()

    expect(calc.history.value).toHaveLength(1)
    expect(calc.history.value[0]).toEqual({ expression: '2+3', result: '5' })
  })

  it('should persist multiple entries', () => {
    const calc = useCalculator()
    calc.loadInitialHistory()

    calc.append('2')
    calc.selectOperator('+')
    calc.append('2')
    calc.calculate()

    calc.reset()

    calc.append('3')
    calc.selectOperator('*')
    calc.append('3')
    calc.calculate()

    expect(calc.history.value).toHaveLength(2)

    expect(calc.history.value[0]).toEqual({ expression: '3*3', result: '9' })
    expect(calc.history.value[1]).toEqual({ expression: '2+2', result: '4' })
  })

  it('should clear history', () => {
    const calc = useCalculator()
    calc.loadInitialHistory()

    calc.append('1')
    calc.selectOperator('+')
    calc.append('1')
    calc.calculate()

    expect(calc.history.value).toHaveLength(1)
    calc.clearHistory()
    expect(calc.history.value).toHaveLength(0)
  })
})
