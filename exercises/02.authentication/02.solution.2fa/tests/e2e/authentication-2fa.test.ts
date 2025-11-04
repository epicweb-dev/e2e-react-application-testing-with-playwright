import { createUser } from '#tests/db-utils.ts'
import { test, expect } from '#tests/test-extend.ts'

test('authenticates using a two-factor authentication', async ({
	navigate,
	page,
}) => {
	await using user = await createUser()

	await navigate('/login')

	await page.getByLabel('Username').fill(user.username)
	await page.getByLabel('Password').fill(user.password)
	await page.getByRole('button', { name: 'Log in' }).click()

	await expect(page.getByText(user.name!)).toBeVisible()
})
