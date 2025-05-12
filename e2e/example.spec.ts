import { test, expect } from '@playwright/test'

test('addition', async ({ page }) => {
	await page.goto('http://localhost:3000')
	await page.waitForLoadState('domcontentloaded')
	await page.getByText('2').click()
	await page.getByText('+').click()
	await page.getByText('3').click()
	await page.getByText('=').click()

	const result = await page.locator('.text-4xl').textContent()
	expect(result?.trim()).toBe('5')
})
