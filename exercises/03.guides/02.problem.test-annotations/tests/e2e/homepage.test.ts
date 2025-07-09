import { test, expect } from '#tests/test-extend'

// 🐨 Add a test details object as the second argument to the "test" function.
// 💰 test(title, details, callback)
//
// 🐨 In the test details object, specify a key called "tag".
// As the value for that key, provide an array with a single tag "@homepage".
// 💰 { tag: ['@tagName'] }
test('displays the welcome heading', async ({ navigate, page }) => {
	await navigate('/')

	await expect(
		page.getByRole('heading', { name: 'The Most Epic of Stacks' }),
	).toBeVisible()
})
