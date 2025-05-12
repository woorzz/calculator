<template>
  <div
    data-testid="calculator"
    class="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border dark:border-gray-700 flex flex-col md:flex-row gap-6"
  >
    <div class="flex-1">
      <div class="mb-2 text-right text-sm text-gray-500 dark:text-gray-400 h-5">
        {{ expression }}
      </div>
      <div
        data-testid="display"
        class="text-right text-4xl font-mono bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 min-h-[72px] text-gray-900 dark:text-white break-words"
      >
        {{ current || '0' }}
      </div>

      <div class="grid grid-cols-4 gap-4">
        <button data-testid="btn-7" class="btn" @click="append('7')">7</button>
        <button data-testid="btn-8" class="btn" @click="append('8')">8</button>
        <button data-testid="btn-9" class="btn" @click="append('9')">9</button>
        <button data-testid="btn-divide" class="btn operator" @click="selectOperator('/')">
          ÷
        </button>

        <button data-testid="btn-4" class="btn" @click="append('4')">4</button>
        <button data-testid="btn-5" class="btn" @click="append('5')">5</button>
        <button data-testid="btn-6" class="btn" @click="append('6')">6</button>
        <button data-testid="btn-multiply" class="btn operator" @click="selectOperator('*')">
          ×
        </button>

        <button data-testid="btn-1" class="btn" @click="append('1')">1</button>
        <button data-testid="btn-2" class="btn" @click="append('2')">2</button>
        <button data-testid="btn-3" class="btn" @click="append('3')">3</button>
        <button data-testid="btn-subtract" class="btn operator" @click="selectOperator('-')">
          −
        </button>

        <button
          data-testid="btn-clear"
          class="btn bg-yellow-500 hover:bg-yellow-600 text-white"
          @click="reset()"
        >
          C
        </button>
        <button data-testid="btn-0" class="btn" @click="append('0')">0</button>
        <button data-testid="btn-dot" class="btn" @click="append('.')">.</button>
        <button data-testid="btn-add" class="btn operator" @click="selectOperator('+')">+</button>

        <button
          data-testid="btn-equals"
          class="btn bg-green-500 hover:bg-green-600 text-white col-span-4"
          @click="calculate"
        >
          =
        </button>
      </div>
    </div>

    <div
      class="w-full md:w-64 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-inner flex flex-col"
    >
      <h2 class="text-lg font-bold mb-4 text-gray-700 dark:text-gray-200">Historique</h2>

      <div class="flex-1 overflow-auto max-h-[500px] space-y-2 pr-1">
        <ul>
          <li
            v-for="(entry, index) in history"
            :key="index"
            class="bg-white dark:bg-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            @click="loadFromHistory(entry)"
          >
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ entry.expression }}</div>
            <div class="text-xl font-mono text-gray-900 dark:text-white">= {{ entry.result }}</div>
          </li>
        </ul>
      </div>

      <button
        data-testid="btn-clear-history"
        @click="clearHistory"
        class="mt-4 text-sm text-red-500 hover:underline self-end"
      >
        Supprimer l'historique
      </button>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'CalculatorView' })
import { ref, computed, onMounted } from 'vue'
import { add, subtract, multiply, divide } from '~/composables/useCalculator'

const current = ref('')
const first = ref(null)
const operator = ref(null)
const history = ref([])
const expressionFromHistory = ref('')
const justCalculated = ref(false)

const append = value => {
  if (value === '.' && current.value.includes('.')) return

  if (justCalculated.value) {
    current.value = value
    justCalculated.value = false
  } else {
    current.value += value
  }
}

const selectOperator = op => {
  if (current.value === '') return
  first.value = Number(current.value)
  current.value = ''
  operator.value = op
}

const calculate = () => {
  const second = Number(current.value)
  if (first.value === null || isNaN(second)) return

  let result = 0
  if (operator.value === '+') result = add(first.value, second)
  if (operator.value === '-') result = subtract(first.value, second)
  if (operator.value === '*') result = multiply(first.value, second)
  if (operator.value === '/') result = divide(first.value, second)

  const resultStr = result.toString()
  history.value.unshift({
    expression: `${first.value} ${operator.value} ${second}`,
    result: resultStr,
  })
  saveHistory()

  current.value = resultStr
  first.value = null
  operator.value = null
  expressionFromHistory.value = ''
  justCalculated.value = true
}

const reset = () => {
  current.value = ''
  first.value = null
  operator.value = null
  expressionFromHistory.value = ''
}

const loadFromHistory = entry => {
  current.value = entry.result
  first.value = null
  operator.value = null
  expressionFromHistory.value = entry.expression
}

const expression = computed(() => {
  if (expressionFromHistory.value) return expressionFromHistory.value
  if (first.value !== null && operator.value) {
    return `${first.value} ${operator.value} ${current.value}`
  }
  return ''
})

const saveHistory = () => {
  localStorage.setItem('calc-history', JSON.stringify(history.value))
}

const clearHistory = () => {
  history.value = []
  localStorage.removeItem('calc-history')
}

onMounted(() => {
  const stored = localStorage.getItem('calc-history')
  if (stored) {
    history.value = JSON.parse(stored)
  }
})
</script>

<style scoped>
.btn {
  @apply py-4 text-xl font-bold rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition;
}

.operator {
  @apply bg-blue-500 hover:bg-blue-600 text-white;
}
</style>
