import { createUser } from '#tests/db-utils.ts'
import { test, expect } from '#tests/test-extend.ts'

test('authenticates using an email and a password', async ({
	navigate,
	page,
}) => {
	// 🐨 Create a test user via the `createUser` utility you've prepared earlier.
	// Note that `createUser` returns a Promise that resolves to a disposable object.
	// Disposing of the user object is also asynchronous, so declare it appropriately.
	// 💰 await using name = await util()
	//
	// 🐨 Go to the login page.
	// 💰 await navigate(route)
	//
	// 🐨 Fill in the login form.
	// Locate the form fields by their labels: "Username" and "Password".
	// Fill in the respective test user's information into those fields.
	// 💰 await page.getByLabel(label).fill(value)
	//
	// 🐨 Submit the login form.
	// 💰 await page.getByRole('button', { name: accessibleName }).click()
	//
	// 🐨 Add an assertion that a link element with the `user.name` text is visible on the page.
	// 💰 await expect(locator).toBeVisible()
})

test('displays an error message when authenticating with invalid credentials', async ({
	navigate,
	page,
}) => {
	// 🐨 Go to the login page.
	//
	// 🐨 Fill in the login form with intentionally invalid data.
	// 💰 await page.getByLabel(label).fill(value)
	//
	// 🐨 Submit the login form.
	// 💰 await page.getByRole('button', { name: accessibleName }).click()
	//
	// 🐨 Add an assertion that an element with the "alert" role and text "Invalid username or password"
	// is visible to the user.
	// 💰 await expect(locator).toBeVisible()
})
