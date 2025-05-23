<template>
  <div
    data-testid="calculator"
    class="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border dark:border-neutral-900 flex flex-col md:flex-row gap-6"
  >
    <div class="flex-1">
      <div
        data-testid="expression"
        class="mb-2 text-right text-sm text-neutral-500 dark:text-neutral-400 h-5"
      >
        {{ expression }}
      </div>

      <div
        data-testid="display"
        class="text-right text-4xl font-mono bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg mb-6 min-h-[72px] text-neutral-900 dark:text-white break-words"
      >
        {{ display }}
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
        <button data-testid="btn-subtract" class="btn operator" @click="handleMinusClick">−</button>

        <button
          data-testid="btn-clear"
          class="btn bg-yellow-500 hover:bg-yellow-600 text-white"
          @click="reset"
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
      class="w-full md:w-64 flex-shrink-0 bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 shadow-inner flex flex-col h-[500px]"
    >
      <h2 class="text-lg font-bold mb-4 text-neutral-700 dark:text-neutral-200">Historique</h2>

      <div class="flex-1 overflow-auto pr-1 space-y-2">
        <ul>
          <li
            v-for="(h, i) in history"
            :key="i"
            class="bg-white dark:bg-neutral-700 rounded-lg p-2 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-600 transition mt-2"
            @click="loadFromHistory(h)"
          >
            <div class="text-sm text-neutral-500 dark:text-neutral-400">{{ h.expression }}</div>
            <div class="text-xl font-mono text-neutral-900 dark:text-white">= {{ h.result }}</div>
          </li>
        </ul>
      </div>

      <button
        data-testid="btn-clear-history"
        class="mt-4 text-sm text-red-500 hover:underline self-end"
        @click="clearHistory"
      >
        Supprimer historique
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCalculator } from '~/composables/useCalculator'
import { onMounted } from 'vue'

defineOptions({ name: 'CalculatorView' })

const {
  display,
  expression,
  history,
  append,
  selectOperator,
  calculate,
  reset,
  clearHistory,
  loadFromHistory,
  handleMinusClick,
} = useCalculator()

const calc = useCalculator()
onMounted(() => {
  calc.loadInitialHistory()
})
</script>

<style scoped>
.btn {
  @apply py-4 text-xl font-bold rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-600 transition;
}

.operator {
  @apply bg-blue-500 hover:bg-blue-600 text-white;
}
</style>
