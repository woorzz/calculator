<template>
    <div
        class="w-full max-w-sm mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border dark:border-gray-700">
        <div class="mb-2 text-right text-sm text-gray-500 dark:text-gray-400 h-5">
            {{ expression }}
        </div>

        <div
            class="text-right text-4xl font-mono bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6 min-h-[72px] text-gray-900 dark:text-white break-words">
            {{ current || '0' }}
        </div>

        <div class="grid grid-cols-4 gap-4">
            <button v-for="n in digits" :key="n" class="btn" @click="append(n)">
                {{ n }}
            </button>

            <button class="btn operator" @click="selectOperator('+')">+</button>
            <button class="btn operator" @click="selectOperator('−')">−</button>
            <button class="btn operator" @click="selectOperator('×')">×</button>
            <button class="btn operator" @click="selectOperator('÷')">÷</button>

            <button class="btn bg-yellow-500 hover:bg-yellow-600 text-white col-span-2" @click="reset">
                C
            </button>
            <button class="btn bg-green-500 hover:bg-green-600 text-white col-span-2" @click="calculate">
                =
            </button>
        </div>

        <div v-if="history.length" class="mt-6 text-sm">
            <h2 class="font-bold mb-2 text-gray-700 dark:text-white">Historique</h2>
            <ul>
                <li v-for="(entry, index) in history" :key="index"
                    class="mb-1 cursor-pointer text-gray-500 hover:underline dark:text-gray-300"
                    @click="usePrevious(index)">
                    {{ entry.display }}
                </li>
            </ul>
            <button @click="clearHistory" class="mt-2 text-xs text-red-500 hover:underline">
                Effacer l’historique
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { add, subtract, multiply, divide } from '~/composables/useCalculator'

const current = ref('')
const first = ref(null)
const operator = ref(null)
const second = ref(null)
const history = ref([])

const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.']

const append = (value) => {
    if (value === '.' && current.value.includes('.')) return
    current.value += value
}

const selectOperator = (opSymbol) => {
    if (current.value === '') return
    first.value = Number(current.value)
    current.value = ''
    operator.value = opSymbol
}

const calculate = () => {
    second.value = Number(current.value)
    if (first.value === null || isNaN(second.value)) return

    let result = 0
    let symbol = operator.value

    if (symbol === '+') result = add(first.value, second.value)
    if (symbol === '−') result = subtract(first.value, second.value)
    if (symbol === '×') result = multiply(first.value, second.value)
    if (symbol === '÷') result = divide(first.value, second.value)

    const display = `${first.value} ${symbol} ${second.value} = ${result}`
    history.value.unshift({ display, result, first: first.value, operator: symbol, second: second.value })

    current.value = result.toString()
    first.value = null
    operator.value = null
    second.value = null
}

const reset = () => {
    current.value = ''
    first.value = null
    operator.value = null
    second.value = null
}

const usePrevious = (index) => {
    const entry = history.value[index]
    current.value = entry.result.toString()
    first.value = entry.first
    operator.value = entry.operator
    second.value = entry.second
}

const clearHistory = () => {
    history.value = []
}

const expression = computed(() => {
    if (first.value !== null && operator.value && second.value !== null) {
        return `${first.value} ${operator.value} ${second.value}`
    }
    if (first.value !== null && operator.value) {
        return `${first.value} ${operator.value} ${current.value}`
    }
    return ''
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