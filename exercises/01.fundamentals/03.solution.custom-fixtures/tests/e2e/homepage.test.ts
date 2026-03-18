import { test, expect } from '#tests/test-extend.ts'

test('displays the welcome heading', async ({ page, navigate }) => {
	await navigate('/')

	await expect(
		page.getByRole('heading', { name: 'The Epic Stack' }),
	).toBeVisible()
})
