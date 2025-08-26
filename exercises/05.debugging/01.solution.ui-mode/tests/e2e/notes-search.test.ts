import { createNotes } from '#tests/e2e/utils'
import { test, expect } from '#tests/test-extend.ts'

test('navigates to the user note from the search results', async ({
	navigate,
	authenticate,
	page,
}) => {
	const { user } = await authenticate({ as: 'user' })
	await using notes = await createNotes({
		ownerId: user.id,
		notes: [
			{
				title: 'First note',
				content: 'Hello world',
			},
		],
	})

	await navigate('/')

	await page.getByRole('searchbox', { name: 'Search' }).fill(user.name!)
	await page.getByRole('button', { name: 'Search' }).click()
	await expect(
		page.getByRole('heading', { name: 'Epic Notes Users' }),
		'Displays search results',
	).toBeVisible()

	await page.getByRole('link', { name: `${user.name}'s notes` }).click()
	await expect(
		page.getByRole('heading', { name: user.name! }),
		'Displays the user profile',
	).toBeVisible()

	await page.getByRole('link', { name: 'My notes' }).click()
	await expect(
		page.getByRole('heading', { name: `${user.name}'s notes` }),
		'Displays the user notes page',
	).toBeVisible()

	await page.getByRole('link', { name: notes.values[0]!.title }).click()
	await expect(
		page
			.getByRole('region', { name: 'First note' })
			.getByText(notes.values[0]!.content),
		'Displays the note contents',
	).toBeVisible()
})
