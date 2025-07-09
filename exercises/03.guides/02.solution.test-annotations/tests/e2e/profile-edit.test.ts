import { test, expect } from '#tests/test-extend.ts'

test(
	'displays the user profile page',
	{
		tag: ['@user', '@profile'],
	},
	async ({ authenticate, navigate, page }) => {
		const { user } = await authenticate({ as: 'user' })
		await navigate('/users/:username', { username: user.username })

		await expect(page.getByRole('heading', { name: user.name! })).toBeVisible()
		await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
		await expect(page.getByRole('link', { name: 'My notes' })).toBeVisible()
		await expect(page.getByRole('link', { name: 'Edit profile' })).toBeVisible()
	},
)

test(
	'saves changes to the name of the user',
	{
		tag: ['@user', '@profile'],
	},
	async ({ authenticate, navigate, page }) => {
		await authenticate({ as: 'user' })
		await navigate('/settings/profile')

		await page.getByRole('textbox', { name: 'Username' }).click()
		await page
			.getByRole('textbox', { name: 'Username' })
			.press('ControlOrMeta+a')
		await page.getByRole('textbox', { name: 'Username' }).fill('new_username')
		await page.getByRole('button', { name: 'Save changes' }).click()

		await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible()
	},
)
