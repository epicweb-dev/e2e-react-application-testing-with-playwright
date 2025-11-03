import { type Page } from '@playwright/test'
import { createTestPasskey } from 'test-passkey'
import { createPasskey, createUser } from '#tests/db-utils.ts'
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
			automaticPresenceSimulation: true,
		},
	})

	return {
		client,
		authenticatorId: result.authenticatorId,
	}
}

test('authenticates using a passkey', async ({ navigate, page }) => {
	await navigate('/login')

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
