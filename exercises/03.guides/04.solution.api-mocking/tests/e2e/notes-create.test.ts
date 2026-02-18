import { http, HttpResponse } from 'msw'
import { type NominatimSearchResponse } from '#app/routes/users+/$username_+/__note-editor.tsx'
import { test, expect } from '#tests/test-extend.ts'

test('displays location suggestions when creating a new note', async ({
	authenticate,
	navigate,
	network,
	page,
}) => {
	network.use(
		http.get<never, never, NominatimSearchResponse>(
			'https://nominatim.openstreetmap.org/search',
			() => {
				return HttpResponse.json([
					{
						place_id: 1,
						addresstype: 'city',
						display_name: 'San Francisco',
					},
					{
						place_id: 2,
						addresstype: 'city',
						display_name: 'San Jose',
					},
				])
			},
		),
	)

	const { user } = await authenticate({ as: 'user' })
	await navigate('/users/:username/notes/new', { username: user.username })

	await page.getByLabel('Title').fill('My note')
	await page.getByLabel('Content').fill('Hello world')

	const locationInput = page.getByLabel('Location')
	await locationInput.waitFor({ state: 'visible' })

	await locationInput.fill('San')
	await expect(page.getByRole('option')).toHaveText([
		'San Francisco',
		'San Jose',
	])

	await page.getByRole('option', { name: 'San Francisco' }).click()
	await expect(locationInput).toHaveValue('San Francisco')

	await page.getByRole('button', { name: 'Submit' }).click()
	await expect(page.getByRole('heading', { name: 'My note' })).toBeVisible()
})
