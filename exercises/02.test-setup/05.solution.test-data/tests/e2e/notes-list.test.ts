import { test, expect } from '#tests/test-extend.ts'
import { createNotes } from './utils'

test('displays all user notes', async ({ navigate, authenticate, page }) => {
	const { user } = await authenticate({ as: 'user' })
	await using notes = await createNotes({
		ownerId: user.id,
		data: [
			{
				title: 'First note',
				content: 'Hello world',
			},
			{
				title: 'Second note',
				content: 'Hello world',
			},
		],
	})

	await navigate('/users/:username/notes', { username: user.username })

	const noteLinks = page
		.getByRole('main')
		.getByRole('list')
		.getByRole('listitem')
		.getByRole('link')

	await expect(noteLinks).toHaveText(notes.values.map((note) => note.title))
})
