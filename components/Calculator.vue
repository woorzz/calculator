<template>
  <div class="calculator">
    <div class="display">{{ current }}</div>
    <div class="buttons">
      <button v-for="n in digits" :key="n" @click="append(n)">{{ n }}</button>

      <button @click="selectOperator('+')">+</button>
      <button @click="selectOperator('-')">-</button>
      <button @click="selectOperator('*')">×</button>

      <button @click="calculate">=</button>
      <button @click="reset">C</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { add, subtract, multiply } from '~/composables/useCalculator'

const current = ref('')
const first = ref(null)
const operator = ref(null)

const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0']

function append(digit) {
  current.value += digit
}

function selectOperator(op) {
  first.value = Number(current.value)
  current.value = ''
  operator.value = op
}

function calculate() {
  const second = Number(current.value)
  let result = 0

  if (operator.value === '+') result = add(first.value, second)
  if (operator.value === '-') result = subtract(first.value, second)
  if (operator.value === '*') result = multiply(first.value, second)

  current.value = result.toString()
  first.value = null
  operator.value = null
}

function reset() {
  current.value = ''
  first.value = null
  operator.value = null
}
</script>

<style scoped>
.calculator {
  max-width: 200px;
  margin: auto;
}
.display {
  text-align: right;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  font-size: 1.5rem;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}
button {
  padding: 10px;
  font-size: 1.2rem;
}
</style>
