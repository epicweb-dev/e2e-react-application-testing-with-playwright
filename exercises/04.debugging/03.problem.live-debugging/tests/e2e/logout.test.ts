import { test, expect } from '#tests/test-extend.ts'

test('logs out the user', async ({ authenticate, navigate, page }) => {
	const { user } = await authenticate({ as: 'user' })

	await navigate('/')

	await page.getByRole('link', { name: user.name! }).click()

	const userMenu = page.getByRole('menu', { name: user.name! })
	await userMenu.getByRole('menuitem', { name: 'Logout' }).click()

	await expect(userMenu).not.toBeVisible()
	await expect(page.getByRole('link', { name: 'Login' })).toBeVisible()
})
