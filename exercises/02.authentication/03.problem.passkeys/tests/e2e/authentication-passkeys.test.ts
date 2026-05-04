import { type Page } from '@playwright/test'
import { createTestPasskey } from 'test-passkey'
import { createPasskey, createUser } from '#tests/db-utils.ts'
import { test, expect } from '#tests/test-extend.ts'

async function createWebAuthnClient(page: Page) {
	// 🐨 💰
	// Create a new Chrome DevTools Protocol session on the given page
	// and assign it to a variable named `session`
	// 💰 await page.context().newCDPSession(page)
	//
	// 🐨 Create a virtual WebAuthn authenticator by sending the
	// "WebAuthn.addVirtualAuthenticator" messages to the session.
	// Store it as "authenticator".
	// 💰 await session.send('WebAuthn.addVirtualAuthenticator', options)
	//
	// 🐨 Provide the following options alongside the "addVirtualAuthenticator"
	// message:
	//  - protocol: "ctap2"
	//  - transport: "internal"
	//  - hasResidentKey: true
	//  - hasUserVerification: true
	//  - isUserVerified: true
	//  - automaticPresenceSimulation: true
	//
	// 🐨 Finally, return an object containing the `session` and the
	// `authenticatorId` (which you can get from the response of the
	// "addVirtualAuthenticator" message).
}

test('authenticates using an existing passkey', async ({ navigate, page }) => {
	// 🐨 Create a test user with the "createUser" utility.
	// 💰 await using value = await fn()

	await navigate('/login')

	// 🐨 Create a test passkey by calling the "createTestPasskey" function
	// from the "test-passkey" package. Provide this page's hostname as the "rpId" option.
	// 💰 createTestPasskey({ rpId: new URL(page.url()).hostname })

	// 🐨 Next, store the public part of the passkey on the server using the
	// "createPasskey" utility. Make sure to provide the following properties:
	//  - id: passkey.credential.credentialId
	//  - userId: the id of the user you just created
	//  - aaguid: passkey.credential.aaguid
	//  - publicKey: passkey.publicKey
	//
	// 💰 await using _ = await createPasskey({ ... })

	// 🐨 Now, create a new virtual authenticator by calling the "createWebAuthnClient"
	// utility and providing it with the current "page".
	// 💰 const { session, authenticatorId } = await fn(args)

	// 🐨 Locate a button with the text "Login with a passkey" and click it.
	// 💰 await page.getByRole(role, { name }).click()

	// 🐨 Finally, write an expectation that a link with the text "user.name"
	// is visible on the page.
	// 💰 await expect(page.getByRole(role, { name })).toBeVisible()
})

test('displays an error when authenticating via a passkey fails', async ({
	navigate,
	page,
}) => {
	await navigate('/login')

	// 🐨 For this failure scenario, create a virtual authenticator by calling
	// the "createWebAuthnClient" utility function.
	// 💰 const { session, authenticatorId } = await fn(args)

	// 🐨 Then, send the "WebAuthn.setUserVerified" message on the CDP session
	// with the "authenticatorId" and "isUserVerified: false" as options.
	// 💰 await session.send('WebAuthn.setUserVerified', options`)

	// 🐨 Locate the "Login with a passkey" button and click it.

	// 🐨 Add an assertion that the element with the role "alert" with a child
	// element containing the following text is visible on the page:
	// 💰 "Failed to authenticate with passkey: The operation either timed out or was not allowed"
	// 💰 await expect(page.getByRole(role).getByText(text)).toBeVisible()
})
