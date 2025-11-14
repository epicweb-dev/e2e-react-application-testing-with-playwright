import { test, expect } from '@playwright/test'

test('displays the welcome heading', async ({ page }) => {
	await page.goto('/')

	await expect(
		page.getByRole('heading', { name: 'The Epic Stack' }),
	).toBeVisible()
})
