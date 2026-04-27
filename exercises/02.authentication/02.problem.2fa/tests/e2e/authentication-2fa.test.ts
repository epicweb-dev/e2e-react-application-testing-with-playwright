import { generateTOTP } from '@epic-web/totp'
import { createUser, createVerification } from '#tests/db-utils.ts'
import { test, expect } from '#tests/test-extend.ts'

test('authenticates using two-factor authentication', async ({
	navigate,
	page,
}) => {
	// 🐨 Create a test user by calling "createUser()" and storing
	// the returned disposable object in a variable called "user".
	// 💰 await using user = await fn()

	// 🐨 Generate a Time-based One-Time Password (TOPT) using the
	// "generateTOTP" function from the "@epic-web/totp" package and
	// store it in a variable called "totp".
	// 💰 const totp = await generateTOTP()

	// 🐨 Create a verification for the user by calling "createVerification()"
	// with an object containing the "totp" and the "userId" (which is the
	// "id" property of the created user). Store the returned disposable
	// object in placeholder variable "_".
	// 💰 await using _ = await fn({ totp, userId: user.id })

	await navigate('/login')

	// 🐨 Fill in the "user.username" into the field with the label "Username".
	// 💰 await page.getByLabel(label).fill(value)

	// 🐨 Fill in the "user.password" into the field with the label "Password".
	// 🐨 Submit the login form.

	// 🐨 Write an assertion that expects a heading element with the text
	// "Check your 2FA app" to be visible on the page.
	// 💰 await expect(page.getByRole(role, { name: name })).toBeVisible()

	// 🐨 Next, generate and enter a new TOTP into the textbox with an
	// accessible name matching /code/i.
	// 💰 await page.getByRole(role, { name: name }).fill((await generateTOTP(totp)).otp)

	// 🐨 Finally, add an assertion that expects the link element
	// with the user's name to be visible on the page.
	// 💰 await expect(page.getByRole(role, { name: user.name })).toBeVisible()
})
