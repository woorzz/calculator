import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCalculator } from '~/composables/useCalculator'
import * as historyService from '~/services/history'

describe('useCalculator composable', () => {
  let calc: ReturnType<typeof useCalculator>

  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
    calc = useCalculator()
  })

  it('initial display and expression should be correct', () => {
    expect(calc.display.value).toBe('0')
    expect(calc.expression.value).toBe('')
  })

  it('loadInitialHistory should populate history from localStorage', () => {
    const entries = [{ expression: '1+1', result: '2' }] // simulate localStorage
    localStorage.setItem('calc-history', JSON.stringify(entries))
    calc.loadInitialHistory()
    expect(calc.history.value).toEqual(entries)
  })

  it('append should prevent multiple dots and allow negative start', () => {
    calc.append('.')
    calc.append('.') // test ; second dot ignored
    expect(calc.display.value).toBe('.')

    calc.reset()
    calc.append('-')
    expect(calc.display.value).toBe('-')
  })

  it('selectOperator should set first and operator only if current exists', () => {
    calc.reset()
    calc.selectOperator('*')
    expect(calc.expression.value).toBe('')

    calc.append('5')
    calc.selectOperator('*')
    expect(calc.expression.value).toBe('5*')
    expect(calc.display.value).toBe('0')
  })

  it('calculate should not change state when missing values', () => {
    calc.reset()
    calc.calculate()
    expect(calc.display.value).toBe('0')
  })

  it('calculate should handle division by zero gracefully', () => {
    // Append 9 / 0
    calc.append('9')
    calc.selectOperator('/')
    calc.append('0')
    calc.calculate()
    expect(calc.display.value).toBe('Error')
  })

  it('calculate should perform operations and reset first and operator', () => {
    // 2 + 3 = 5
    calc.append('2')
    calc.selectOperator('+')
    calc.append('3')
    calc.calculate()
    expect(calc.display.value).toBe('5')
    expect(calc.expression.value).toBe('')

    // 5 * 4 = 20 (chain without reset)
    calc.selectOperator('*')
    calc.append('4')
    calc.calculate()
    expect(calc.display.value).toBe('20')
  })

  it('reset should clear current, first, and operator', () => {
    calc.append('7')
    calc.selectOperator('-')
    calc.append('2')
    calc.reset()
    expect(calc.display.value).toBe('0')
    expect(calc.expression.value).toBe('')
  })

  it('clearHistory should clear history, reset state, and remove from storage', () => {
    calc.append('1')
    calc.selectOperator('+')
    calc.append('1')
    calc.calculate()
    expect(calc.history.value.length).toBeGreaterThan(0)

    calc.clearHistory()
    expect(calc.history.value).toHaveLength(0)
    expect(calc.display.value).toBe('0')
    expect(localStorage.getItem('calc-history')).toBeNull()
  })

  it('loadFromHistory should load result into current and reset operator and first', () => {
    const entry = { expression: '4*4', result: '16' }
    calc.loadFromHistory(entry)
    expect(calc.display.value).toBe('16')
    expect(calc.expression.value).toBe('')
  })

  it('handleMinusClick should start negative number and allow negative second operand', () => {
    // first number negative
    calc.reset()
    calc.handleMinusClick()
    expect(calc.display.value).toBe('-')

    // negative second operand
    calc.reset()
    calc.append('3')
    calc.selectOperator('+')
    calc.handleMinusClick()
    expect(calc.display.value).toBe('-')

    // complete calculation: 3 + -3 = 0
    calc.append('3')
    calc.calculate()
    expect(calc.display.value).toBe('0')
  })
})
