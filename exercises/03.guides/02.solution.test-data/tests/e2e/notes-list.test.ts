import { createNotes } from '#tests/e2e/utils'
import { test, expect } from '#tests/test-extend.ts'

test('displays all user notes', async ({ navigate, authenticate, page }) => {
	const { user } = await authenticate({ as: 'user' })
	await using _ = await createNotes({
		ownerId: user.id,
		notes: [
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

	const notes = page
		.getByRole('list', { name: 'Notes' })
		.getByRole('listitem')
		.getByRole('link')

	await expect(notes).toHaveText(['First note', 'Second note'])
})
