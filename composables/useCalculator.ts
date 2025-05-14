import { ref, computed } from 'vue'
import { add, subtract, multiply, divide } from '~/services/calculator'
import {
  getHistory,
  saveHistory as persistHistory,
  clearHistory as clearStoredHistory,
} from '~/services/history'

export function useCalculator() {
  const current = ref('')
  const first = ref<number | null>(null)
  const operator = ref<string | null>(null)
  const history = ref<Array<{ expression: string; result: string }>>([])

  const display = computed(() => current.value || '0')
  const expression = computed(() => {
    if (first.value !== null && operator.value) {
      return `${first.value}${operator.value}${current.value}`
    }
    return ''
  })

  function loadInitialHistory() {
    history.value = getHistory()
  }

  function append(value: string) {
    if (value === '.' && current.value.includes('.')) return
    if (value === '-' && current.value === '') {
      current.value = '-'
      return
    }
    current.value += value
  }

  function selectOperator(op: string) {
    if (!current.value) return
    first.value = Number(current.value)
    current.value = ''
    operator.value = op
  }

  function calculate() {
    if (first.value === null || !operator.value || !current.value) return

    const a = first.value
    const b = parseFloat(current.value)

    let result: number
    try {
      switch (operator.value) {
        case '+':
          result = add(a, b)
          break
        case '-':
          result = subtract(a, b)
          break
        case '*':
          result = multiply(a, b)
          break
        case '/':
          result = divide(a, b)
          break
        default:
          return
      }
    } catch {
      current.value = 'Error'
      return
    }

    const resultStr = result.toString()
    const expr = `${a}${operator.value}${b}`

    const entry = { expression: expr, result: resultStr }
    history.value.unshift(entry)
    persistHistory(history.value)

    current.value = resultStr
    first.value = null
    operator.value = null
  }

  function reset() {
    current.value = ''
    first.value = null
    operator.value = null
  }

  function loadFromHistory(entry: { expression: string; result: string }) {
    current.value = entry.result
    first.value = null
    operator.value = null
  }

  function clearHistory() {
    history.value = []
    reset()
    clearStoredHistory()
  }

  function handleMinusClick() {
    if (!current.value) {
      current.value = '-'
    } else if (operator.value === null && current.value) {
      selectOperator('-')
    }
  }

  return {
    display,
    expression,
    history,
    append,
    selectOperator,
    calculate,
    reset,
    loadFromHistory,
    clearHistory,
    loadInitialHistory,
    handleMinusClick,
  }
}
