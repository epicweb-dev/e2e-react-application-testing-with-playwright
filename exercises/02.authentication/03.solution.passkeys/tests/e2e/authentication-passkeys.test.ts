import { type Page } from '@playwright/test'
import { createTestPasskey } from 'test-passkey'
import { createPasskey, createUser } from '#tests/db-utils.ts'
import { test, expect } from '#tests/test-extend.ts'

async function createWebAuthnClient(page: Page) {
	const session = await page.context().newCDPSession(page)
	await session.send('WebAuthn.enable')

	const authenticator = await session.send('WebAuthn.addVirtualAuthenticator', {
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
		session,
		authenticatorId: authenticator.authenticatorId,
	}
}

test('authenticates using an existing passkey', async ({ navigate, page }) => {
	await using user = await createUser()

	await navigate('/login')

	const passkey = createTestPasskey({
		rpId: new URL(page.url()).hostname,
	})

	await using _ = await createPasskey({
		id: passkey.credential.credentialId,
		userId: user.id,
		aaguid: passkey.credential.aaguid || '',
		publicKey: passkey.publicKey,
	})

	const { session, authenticatorId } = await createWebAuthnClient(page)
	await session.send('WebAuthn.addCredential', {
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

	await expect(page.getByRole('link', { name: user.name! })).toBeVisible()
})

test('displays an error when authenticating via a passkey fails', async ({
	navigate,
	page,
}) => {
	await navigate('/login')

	const { session, authenticatorId } = await createWebAuthnClient(page)
	await session.send('WebAuthn.setUserVerified', {
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
