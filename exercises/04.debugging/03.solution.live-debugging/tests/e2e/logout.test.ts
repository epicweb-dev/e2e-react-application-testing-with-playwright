import { test, expect } from '#tests/test-extend.ts'

test('logs out the user', async ({ authenticate, navigate, page }) => {
	const { user } = await authenticate({ as: 'user' })

	await navigate('/')

	const userMenu = page.getByRole('link', { name: user.name! })
	await userMenu.click()
	await userMenu.getByRole('link', { name: 'Logout' }).click()

	await expect(userMenu).not.toBeVisible()
	await expect(page.getByRole('link', { name: 'Login' })).toBeVisible()
})
