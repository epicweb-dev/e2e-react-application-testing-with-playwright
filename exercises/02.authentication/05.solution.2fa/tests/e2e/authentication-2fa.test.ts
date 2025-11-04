import { generateTOTP } from '@epic-web/totp'
import { createUser, createVerification } from '#tests/db-utils.ts'
import { test, expect } from '#tests/test-extend.ts'

test('authenticates using two-factor authentication (setup)', async ({
	navigate,
	page,
}) => {
	// Create a test user and enable 2FA for them directly in the database.
	await using user = await createUser()
	const totp = await generateTOTP()
	await using _ = await createVerification({
		totp,
		userId: user.id,
	})

	// Log in as the created user.
	await navigate('/login')

	await page.getByLabel('Username').fill(user.username)
	await page.getByLabel('Password').fill(user.password)
	await page.getByRole('button', { name: 'Log in' }).click()

	await page
		.getByRole('textbox', { name: /code/i })
		.fill((await generateTOTP()).otp)

	await page.getByRole('button', { name: 'Submit' }).click()

	await expect(page.getByRole('link', { name: user.name! })).toBeVisible()
})
