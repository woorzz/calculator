import { test, expect } from '@playwright/test'

test.describe('Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000', { timeout: 15000 })
    await page.waitForLoadState('domcontentloaded')
  })

  test('should correctly add two numbers', async ({ page }) => {
    await page.getByRole('button', { name: '6' }).click()
    await page.getByRole('button', { name: '+' }).click()
    await page.getByRole('button', { name: '6' }).click()
    await page.getByRole('button', { name: '=', exact: true }).click()

    const result = await page.locator('.text-4xl').textContent()
    expect(result?.trim()).toBe('12')
  })

  test('should clear result after pressing C', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click()
    await page.getByRole('button', { name: '+' }).click()
    await page.getByRole('button', { name: '2' }).click()
    await page.getByRole('button', { name: '=', exact: true }).click()
    await page.getByRole('button', { name: 'C', exact: true }).click()

    const result = await page.locator('.text-4xl').textContent()
    expect(result?.trim()).toBe('0')
  })
})
