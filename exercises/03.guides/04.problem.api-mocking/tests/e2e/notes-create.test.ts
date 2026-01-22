// 🐨 import `http` and `HttpResponse` from "msw"
// 💰 import { this, that } from 'somewhere'

import { type GoogleFindPlaceApiResponse } from '#app/routes/users+/$username_+/__note-editor.tsx'
import { test, expect } from '#tests/test-extend.ts'

test('displays location suggestions when creating a new note', async ({
	authenticate,
	navigate,
	// 🐨 Access the "network" fixture from the test context.
	page,
}) => {
	// 🐨 Call `network.use()` to describe the network for this test.
	// As the argument, provide the request handler matching the Google Places API call
	// ("https://maps.googleapis.com/maps/api/place/findplacefromtext/json").
	// 💰 network.use(http.get(path, resolver))
	// 💰 http.get<never, never, GoogleFindPlaceApiResponse>(path, resolver)
	//
	// 🐨 In the resolver function, return a mocked JSON response.
	// Follow the inferred type definitions to produce a valid response from the
	// Google Places API. List at least two places.
	// 💰 return HttpResponse.json(payload)
	// 💰 { candidates: [...] }
	// 🦉 Use `crypto.randomUUID()` to generate `place_id` values.

	const { user } = await authenticate({ as: 'user' })
	await navigate('/users/:username/notes/new', { username: user.username })

	// 🐨 Locate an element by label "Title" and type "My note" into it.
	// 💰 await page.getByLabel(label).fill(text)

	// 🐨 Locate an element by label "Content" and type the note's content into it.
	// (You can come up with your own content!)

	// 🐨 Declare a variable called "locationInput" and assign it a locator
	// for the element by label "Location".
	// 💰 const locationInput = locator

	// 🐨 Type the first three letter of any place from the Google Place API mocked response
	// into the `locationInput`.
	// For example, if you listed "San Francisco", type "San".
	// 💰 await input.fill(value)

	// 🐨 Write an assertion that the elements by role "Option" must have a text content
	// equal to the place suggestions you expect to see for the entered location.
	// 💰 await expect(Locator).toHaveText([firstSuggestion, secondSuggestion])
	// 🦉 If multiple elements match a locator, Playwright will assert on all of them.

	// 🐨 Click on the first suggestion from the list.
	// 🦉 Note that the suggestions' accessible role is "option".
	// 💰 await locator.click()

	// 🐨 Assert that the full location name has been filled into the `locationInput`.
	// 💰 expect(locator).toHaveValue(value)

	// 🐨 CLick on the "Submit" button to create a new note.

	// 🐨 Finally, assert that a heading with the new note's title is visible on the page.
	// 💰 expect(locator)toBeVisible()
})
