import { test, expect } from '#tests/test-extend.ts'

// 🐨 Add a test details object as the second argument to the "test" function.
// 💰 test(title, details, callback)
//
// 🐨 In the test details object, specify a key called "tag".
// As the value for that key, provide an array with the tags "@user" and "@notes".
// 💰 { tag: ['@oneTag', "@anotherTag"] }
test('creates a new note', async ({ navigate, authenticate, page }) => {
	const { user } = await authenticate({ as: 'user' })

	await navigate('/users/:username/notes/new', { username: user.username })

	await page.getByLabel('Title').fill('My new note')
	await page.getByLabel('Content').fill('Hello world')
	await page.getByRole('button', { name: 'Submit' }).click()

	await expect(page).toHaveURL(new RegExp(`/users/${user.username}/notes/.+`))
	await expect(page.getByRole('heading', { name: 'My new note' })).toBeVisible()
	await expect(
		page.getByLabel('My new note').getByText('Hello world'),
	).toBeVisible()
})
