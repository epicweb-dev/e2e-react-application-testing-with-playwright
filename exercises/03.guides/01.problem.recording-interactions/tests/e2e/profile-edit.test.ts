import { test, expect } from '#tests/test-extend.ts'

test('saves changes to the name of the user', async ({
	navigate,
	authenticate,
	page,
}) => {
	await authenticate({ as: 'user' })
	await navigate('/settings/profile')

	await page.getByRole('textbox', { name: 'Name', exact: true }).click()
	await page
		.getByRole('textbox', { name: 'Name', exact: true })
		.press('ControlOrMeta+a')
	await page
		.getByRole('textbox', { name: 'Name', exact: true })
		.fill('John Doe')
	await page.getByRole('button', { name: 'Save changes' }).click()
	await page.getByRole('link', { name: 'John Doe John Doe' }).click()
	await page.getByRole('menuitem', { name: 'Profile' }).click()
	await expect(page.getByRole('heading', { name: 'John Doe' })).toBeVisible()
})
