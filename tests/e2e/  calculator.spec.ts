import { test, expect } from '@playwright/test'

test.describe('Calculator', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000', { timeout: 15000 })
        await page.waitForLoadState('domcontentloaded')
    })

    test('add two numbers', async ({ page }) => {
        await page.getByRole('button', { name: '6' }).click()
        await page.getByRole('button', { name: '+' }).click()
        await page.getByRole('button', { name: '6' }).click()
        await page.getByRole('button', { name: '=' }).click()

        await expect(page.locator('.text-4xl')).toHaveText('12')
    })

    test('add two number and clear the result', async ({ page }) => {
        await page.getByRole('button', { name: '5' }).click()
        await page.getByRole('button', { name: '+' }).click()
        await page.getByRole('button', { name: '2' }).click()
        await page.getByRole('button', { name: '=' }).click()
        await page.getByRole('button', { name: 'C', exact: true }).click()

        await expect(page.locator('.text-4xl')).toHaveText('0')
    })

    test('subtract numbers', async ({ page }) => {
        await page.getByRole('button', { name: '9' }).click()
        await page.getByText('−').click()
        await page.getByRole('button', { name: '4' }).click()
        await page.getByRole('button', { name: '=' }).click()

        await expect(page.locator('.text-4xl')).toHaveText('5')
    })

    test('multiply numbers', async ({ page }) => {
        await page.getByRole('button', { name: '7' }).click()
        await page.getByRole('button', { name: '×' }).click()
        await page.getByRole('button', { name: '3' }).click()
        await page.getByRole('button', { name: '=' }).click()

        await expect(page.locator('.text-4xl')).toHaveText('21')
    })

    test('divide numbers', async ({ page }) => {
        await page.getByRole('button', { name: '8' }).click()
        await page.getByRole('button', { name: '÷' }).click()
        await page.getByRole('button', { name: '2' }).click()
        await page.getByRole('button', { name: '=' }).click()

        await expect(page.locator('.text-4xl')).toHaveText('4')
    })

    test('division by zero gracefully', async ({ page }) => {
        await page.getByRole('button', { name: '9' }).click()
        await page.getByRole('button', { name: '÷' }).click()
        await page.getByRole('button', { name: '0' }).click()
        await page.getByRole('button', { name: '=' }).click()

        const result = await page.locator('.text-4xl').textContent()
        expect(result?.trim()).toMatch(/(Infinity|NaN|0)/)
    })

    test('additions after reset C', async ({ page }) => {
        await page.getByRole('button', { name: '4' }).click()
        await page.getByRole('button', { name: '+' }).click()
        await page.getByRole('button', { name: '4' }).click()
        await page.getByRole('button', { name: '=' }).click()
        await expect(page.locator('.text-4xl')).toHaveText('8')

        await page.getByRole('button', { name: 'C', exact: true }).click()

        await page.getByRole('button', { name: '2' }).click()
        await page.getByRole('button', { name: '+' }).click()
        await page.getByRole('button', { name: '2' }).click()
        await page.getByRole('button', { name: '=' }).click()
        await expect(page.locator('.text-4xl')).toHaveText('4')
    })
})
