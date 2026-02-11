import { createNotes } from '#tests/db-utils.ts'
import { test, expect } from '#tests/test-extend.ts'

test('displays all user notes', async ({ navigate, authenticate, page }) => {
	const { user } = await authenticate({ as: 'user' })
	await using _ = await createNotes({
		ownerId: user.id,
		notes: [
			{
				title: 'First Note',
				content: 'Hello world',
			},
			{
				title: 'Second Note',
				content: 'Goodbye cosmos',
			},
		],
	})

	await navigate('/users/:username/notes', { username: user.username })

	const notes = page
		.getByRole('list', { name: 'Notes' })
		.getByRole('listitem')
		.getByRole('link')

	await expect(notes).toHaveText(['First Note', 'Second Note'])

	await notes.getByText('First Note').click()
	await expect(page.getByRole('heading', { name: 'First Note' })).toBeVisible()
	await expect(
		page.getByLabel('First Note').getByText('Hello world'),
	).toBeVisible()

	await notes.getByText('Second Note').click()
	await expect(page.getByRole('heading', { name: 'Second Note' })).toBeVisible()
	await expect(
		page.getByLabel('Second Note').getByText('Goodbye cosmos'),
	).toBeVisible()
})
