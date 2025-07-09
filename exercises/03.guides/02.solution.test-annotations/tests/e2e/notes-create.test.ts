import { test, expect } from '#tests/test-extend.ts'

test(
	'creates a new note',
	{
		tag: ['@user', '@notes'],
	},
	async ({ navigate, authenticate, page }) => {
		const { user } = await authenticate({ as: 'user' })

		await navigate('/users/:username/notes/new', { username: user.username })

		await page.getByLabel('Title').fill('My new note')
		await page.getByLabel('Content').fill('Hello world')
		await page.getByRole('button', { name: 'Submit' }).click()

		await expect(page).toHaveURL(new RegExp(`/users/${user.username}/notes/.+`))
		await expect(
			page.getByRole('heading', { name: 'My new note' }),
		).toBeVisible()
		await expect(
			page.getByLabel('My new note').getByText('Hello world'),
		).toBeVisible()
	},
)
