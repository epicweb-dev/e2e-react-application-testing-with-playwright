import { type Page } from '@playwright/test'
import { createTestPasskey } from 'test-passkey'
import { test, expect } from '#tests/test-extend.ts'

async function createWebAuthnClient(page: Page) {
	const client = await page.context().newCDPSession(page)
	await client.send('WebAuthn.enable')

	const result = await client.send('WebAuthn.addVirtualAuthenticator', {
		options: {
			protocol: 'ctap2',
			transport: 'internal',
			hasResidentKey: true,
			hasUserVerification: true,
			isUserVerified: true,
			// Authenticator will automatically respond to the next prompt in the browser.
			automaticPresenceSimulation: true,
		},
	})

	return {
		client,
		authenticatorId: result.authenticatorId,
	}
}

test('authenticates using an existing passkey', async ({
	app,
	navigate,
	page,
	createUser,
	createPasskey,
}) => {
	await navigate('/login')

	// Create a test passkey.
	const passkey = createTestPasskey({
		rpId: new URL(page.url()).hostname,
	})

	// Add the passkey to the server.
	await using user = await createUser()
	await using _ = await createPasskey({
		id: passkey.credential.credentialId,
		aaguid: passkey.credential.aaguid || '',
		publicKey: passkey.publicKey,
		userId: user.id,
		counter: passkey.credential.signCount,
	})

	// Add the passkey to the browser.
	const { client, authenticatorId } = await createWebAuthnClient(page)
	await client.send('WebAuthn.addCredential', {
		authenticatorId,
		credential: {
			...passkey.credential,
			isResidentCredential: true,
			userName: user.username,
			userHandle: btoa(user.id),
			userDisplayName: user.name ?? user.email,
		},
	})

	await page.getByRole('button', { name: 'Login with a passkey' }).click()

	await expect(page.getByText(user.name!)).toBeVisible()
})

test('displays an error when authenticating via a passkey fails', async ({
	app,
	navigate,
	page,
}) => {
	await navigate('/login')

	const { client, authenticatorId } = await createWebAuthnClient(page)
	await client.send('WebAuthn.setUserVerified', {
		authenticatorId,
		isUserVerified: false,
	})

	await page.getByRole('button', { name: 'Login with a passkey' }).click()

	await expect(
		page.getByText(
			'Failed to authenticate with passkey: The operation either timed out or was not allowed',
		),
	).toBeVisible()
})
