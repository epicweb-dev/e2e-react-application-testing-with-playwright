// 💣 Remove this import.
// You will be using your custom `test` and `expect` functions.
import { test, expect } from '@playwright/test'

// 🐨 Import `test` and `expect` from the "#tests/test-extend.ts" module.
// 💰 import { this, that } from 'somewhere'

test('displays the welcome heading', async ({
	// 🐨 Import the newly created `navigate` fixture from the test context.
	page,
}) => {
	// 🐨 Replace the `page.goto()` call with `navigate()`.
	// Explore the path argument to `navigate()`. See how it provides route suggestions?
	await page.goto('/')

	await expect(
		page.getByRole('heading', { name: 'The Epic Stack' }),
	).toBeVisible()
})
