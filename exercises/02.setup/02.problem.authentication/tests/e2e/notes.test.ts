import { test, expect } from '#tests/test-extend.ts'

test('creates a new note', async ({
	// 🐨 Reference the custom "authenticate" fixture from the test context.
	page,
}) => {
	// 🐨 Authenticate as a "user" persona by calling the "authenticate" fixture
	// and providing it with the options object. Specify the "as" key in that object
	// and set its value to the name of the persona.
	// 💰 await authenticate({ as: PERSONA_NAME })
	//
	// 🐨 Destructure the returned session object to get its "user" key.
	// You will need it later in this test.
	// 💰 const { user } = await authenticate(...)
	//
	// 🐨 Navigate to the new note route in the app.
	// Reference the username from the authenticated "user" object.
	// 💰 `/users/${username}/notes/new`
	// 💰 await page.goto(ROUTE)
	//
	// 🐨 Interact with the "New note" form to fill in the note's title and content.
	// 💰 await page.getByLabel('Title').fill(NOTE_TITLE)
	// 💰 await page.getByLabel('Content').fill(NOTE_CONTENT)
	//
	// 🐨 Submit the form to create a new note.
	// 💰 await page.getByRole('button', { name: 'Submit' }).click()
	//
	// 🐨 Finally, assert that the new note has been successfully created.
	// You can do that by writing assertions for the following criteria:
	// 1. The page URL is "/users/{username}/notes/<anything>";
	// 2. The heading with the note title is visible on the page;
	// 3. The note's content is visible on the page.
})
