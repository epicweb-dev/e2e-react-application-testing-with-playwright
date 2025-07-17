import { createNotes } from '#tests/e2e/utils'
import { test, expect } from '#tests/test-extend.ts'

test('displays all user notes', async ({ navigate, authenticate, page }) => {
	const { user } = await authenticate({ as: 'user' })

	// 🐨 Call the `createNotes` utility and await its result.
	// 💰 await fn()
	//
	// 🐨 In the argument to the `createNotes` utility, provide an object
	// with the following keys:
	// - ownerId, the ID of the authenticated `user`;
	// - data, an array of the notes to create.
	//
	// 🐨 In the `data` property of the `createNotes` argument,
	// list a few notes you want to create for this user. Follow the types
	// to provide the required properties of the notes.
	//
	// 🐨 Consume the result of the `createNotes` utility as
	// an asynchronous disposable object called "notes".
	// This means using the special `await using` keywords instead of `const`.
	// 💰 await using notes = await fn()

	await navigate('/users/:username/notes', { username: user.username })

	// 🐨 Declare a variable called `noteLinks`.
	// As the value for this variable, assign it a result of creating a nested
	// locator in Playwright, using the `page` object. The locator is composed
	// of the following accessible roles:
	// main -> list -> listitem -> link.
	// 💰 page.getByRole(one).getByRole(two).getByRole(three)

	// 🐨 Finally, write an assertion that the `noteLinks` have the text content
	// equal to the titles of the created notes. Feel free to map `notes.values`
	// to create the expected array dynamically.
	// 💰 await expect(locator).toHaveText(['one', 'two'])
})
