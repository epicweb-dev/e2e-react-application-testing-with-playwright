import { test, expect } from '@playwright/test'

test('displays the page heading', async ({ page }) => {
	await page.goto('https://epicweb.dev/')

	await expect(
		page.getByRole('heading', {
			name: 'Full Stack Workshop Training for Professional Web Developers',
		}),
	).toBeVisible()
})
