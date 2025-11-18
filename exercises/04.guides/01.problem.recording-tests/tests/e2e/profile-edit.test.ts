import { test, expect } from '#tests/test-extend.ts'

test('saves changes to the name of the user', async ({
	navigate,
	authenticate,
	page,
}) => {
	await authenticate({ as: 'user' })
	await navigate('/settings/profile')

	// 🐨 In the Playwright extension for Visual Studio Code,
	// enable the "Show browser" option and run this test.
	// Then, place your cursor after this comment block and click
	// "Record at cursor" from the Playwright extension panel.
})
