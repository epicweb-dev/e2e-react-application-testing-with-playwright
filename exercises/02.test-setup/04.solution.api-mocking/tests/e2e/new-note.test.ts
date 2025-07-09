import { http, HttpResponse } from 'msw'
import { type GoogleFindPlaceApiResponse } from '#app/routes/users+/$username_+/__note-editor.tsx'
import { test, expect } from '#tests/test-extend.ts'

test('displays location suggestions when creating a new note', async ({
	authenticate,
	navigate,
	network,
	page,
}) => {
	network.use(
		http.get<never, never, GoogleFindPlaceApiResponse>(
			'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
			() => {
				return HttpResponse.json({
					candidates: [
						{
							place_id: crypto.randomUUID(),
							formatted_address: 'San Francisco',
						},
						{
							place_id: crypto.randomUUID(),
							formatted_address: 'San Jose',
						},
					],
				})
			},
		),
	)

	const { user } = await authenticate({ as: 'user' })
	await navigate('/users/:username/notes/new', { username: user.username })

	await page.getByLabel('Title').fill('My note')
	await page.getByLabel('Content').fill('Hello world')

	const locationInput = page.getByLabel('Location')
	await locationInput.pressSequentially('San', { delay: 150 })
	await expect(page.getByRole('option')).toHaveText([
		'San Francisco',
		'San Jose',
	])

	await page.getByRole('option', { name: 'San Francisco' }).click()
	await expect(locationInput).toHaveValue('San Francisco')

	await page.getByRole('button', { name: 'Submit' }).click()
	await expect(page.getByRole('heading', { name: 'My note' })).toBeVisible()
})
