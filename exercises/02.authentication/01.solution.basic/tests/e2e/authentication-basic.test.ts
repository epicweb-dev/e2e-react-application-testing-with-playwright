import { createUser } from '#tests/db-utils.ts'
import { test, expect } from '#tests/test-extend.ts'

test('authenticates using a email and password', async ({ navigate, page }) => {
	await using user = await createUser()

	await navigate('/login')

	await page.getByLabel('Username').fill(user.username)
	await page.getByLabel('Password').fill(user.password)
	await page.getByRole('button', { name: 'Log in' }).click()

	await expect(page.getByText(user.name!)).toBeVisible()
})

test('displays an error message when authenticating with invalid credentials', async ({
	navigate,
	page,
}) => {
	await navigate('/login')

	await page.getByLabel('Username').fill('non_existing_user')
	await page.getByLabel('Password').fill('non_existing_password')
	await page.getByRole('button', { name: 'Log in' }).click()

	await expect(
		page.getByRole('alert').getByText('Invalid username or password'),
	).toBeVisible()
})
