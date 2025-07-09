import { test, expect } from '#tests/test-extend.ts'

test('saves changes to the name of the user', async ({
	navigate,
	authenticate,
	page,
}) => {
	await authenticate({ as: 'user' })
	await navigate('/settings/profile')

	await page.getByRole('textbox', { name: 'Username' }).click()
	await page.getByRole('textbox', { name: 'Username' }).press('ControlOrMeta+a')
	await page.getByRole('textbox', { name: 'Username' }).fill('new_username')
	await page.getByRole('button', { name: 'Save changes' }).click()

	await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible()
})
