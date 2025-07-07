import { test, expect } from '#tests/test-extend.ts'

test('displays the welcome heading', async ({ navigate, page }) => {
	await navigate('/')

	await expect(
		page.getByRole('heading', { name: 'The Epic Stack' }),
	).toBeVisible()
})
