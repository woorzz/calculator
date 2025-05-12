import { test, expect } from '@playwright/test'

test.describe('Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000', { timeout: 15000 })
    await page.waitForLoadState('domcontentloaded')
  })

  test('should correctly add two numbers', async ({ page }) => {
    const calc = page.getByTestId('calculator')

    await calc.getByTestId('btn-6').click()
    await calc.getByTestId('btn-add').click()
    await calc.getByTestId('btn-6').click()
    await calc.getByTestId('btn-equals').click()

    await expect(calc.getByTestId('display')).toHaveText('12')
  })

  test('should clear result after pressing C', async ({ page }) => {
    const calc = page.getByTestId('calculator')

    await calc.getByTestId('btn-5').click()
    await calc.getByTestId('btn-add').click()
    await calc.getByTestId('btn-2').click()
    await calc.getByTestId('btn-equals').click()
    await calc.getByTestId('btn-clear').click()

    await expect(calc.getByTestId('display')).toHaveText('0')
  })

  test('should correctly subtract two numbers', async ({ page }) => {
    const calc = page.getByTestId('calculator')

    await calc.getByTestId('btn-9').click()
    await calc.getByTestId('btn-subtract').click()
    await calc.getByTestId('btn-4').click()
    await calc.getByTestId('btn-equals').click()

    await expect(calc.getByTestId('display')).toHaveText('5')
  })

  test('should correctly multiply two numbers', async ({ page }) => {
    const calc = page.getByTestId('calculator')

    await calc.getByTestId('btn-7').click()
    await calc.getByTestId('btn-multiply').click()
    await calc.getByTestId('btn-3').click()
    await calc.getByTestId('btn-equals').click()

    await expect(calc.getByTestId('display')).toHaveText('21')
  })

  test('should correctly divide two numbers', async ({ page }) => {
    const calc = page.getByTestId('calculator')

    await calc.getByTestId('btn-8').click()
    await calc.getByTestId('btn-divide').click()
    await calc.getByTestId('btn-2').click()
    await calc.getByTestId('btn-equals').click()

    await expect(calc.getByTestId('display')).toHaveText('4')
  })

  test('division by zero should be handled gracefully', async ({ page }) => {
    const calc = page.getByTestId('calculator')

    await calc.getByTestId('btn-9').click()
    await calc.getByTestId('btn-divide').click()
    await calc.getByTestId('btn-0').click()
    await calc.getByTestId('btn-equals').click()

    const txt = await calc.getByTestId('display').textContent()
    expect(txt?.trim()).toMatch(/^(Infinity|NaN|0)$/)
  })

  test('should allow new additions after reset', async ({ page }) => {
    const calc = page.getByTestId('calculator')

    await calc.getByTestId('btn-4').click()
    await calc.getByTestId('btn-add').click()
    await calc.getByTestId('btn-4').click()
    await calc.getByTestId('btn-equals').click()
    await expect(calc.getByTestId('display')).toHaveText('8')

    await calc.getByTestId('btn-clear').click()

    await calc.getByTestId('btn-2').click()
    await calc.getByTestId('btn-add').click()
    await calc.getByTestId('btn-2').click()
    await calc.getByTestId('btn-equals').click()
    await expect(calc.getByTestId('display')).toHaveText('4')
  })
})
