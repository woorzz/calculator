import { ref, computed, onMounted } from 'vue'

export function useCalculator() {
  const current = ref<string>('')
  const first = ref<number | null>(null)
  const operator = ref<string | null>(null)
  const history = ref<Array<{ expression: string; result: string }>>([])

  const display = computed(() => current.value || '0')
  const expression = computed(() => {
    if (first.value !== null && operator.value) {
      return `${first.value} ${operator.value} ${current.value}`
    }
    return ''
  })

  onMounted(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = window.localStorage.getItem('calc-history')
        history.value = raw ? JSON.parse(raw) : []
      } catch {
        history.value = []
      }
    }
  })

  function saveHistory() {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('calc-history', JSON.stringify(history.value))
    }
  }

  function append(value: string) {
    console.log(value)
    if (value === '.' && current.value.includes('.')) return

    if (value === '-' && current.value === '') {
      current.value = '-'
      return
    }

    current.value += value
  }

  function handleMinusClick() {
    // Si l'utilisateur commence une nouvelle saisie ou après un opérateur : ajouter un "-"
    if (current.value === '' || current.value === '0' || /[+\-*/]$/.test(expression)) {
      append('-')
    } else {
      selectOperator('-')
    }
  }

  function selectOperator(op: string) {
    console.log(op)
    if (!current.value) return
    first.value = Number(current.value)
    current.value = ''
    operator.value = op
  }

  function calculate() {
    const second = Number(current.value)
    if (first.value === null || isNaN(second) || !operator.value) return

    let result: number
    switch (operator.value) {
      case '+':
        result = first.value + second
        break
      case '-':
        result = first.value - second
        break
      case '*':
        result = first.value * second
        break
      case '/':
        result = second === 0 ? NaN : first.value / second
        break
      default:
        return
    }

    const resultStr = String(result)
    history.value.unshift({
      expression: `${first.value} ${operator.value} ${second}`,
      result: resultStr,
    })
    saveHistory()

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
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('calc-history')
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
    handleMinusClick,
  }
}
