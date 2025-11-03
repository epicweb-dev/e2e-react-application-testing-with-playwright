import { generateKeyPairSync } from 'node:crypto'
import { type Page } from '@playwright/test'
import cbor from 'cbor'
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

function generateKeys() {
	const { privateKey, publicKey } = generateKeyPairSync('ec', {
		namedCurve: 'P-256',
	})

	const spkiPublicKey = publicKey.export({ type: 'spki', format: 'der' })
	const publicKeyBytes = spkiPublicKey.subarray(-65)
	const x = publicKeyBytes.subarray(1, 33)
	const y = publicKeyBytes.subarray(33, 65)

	const cosePublickey = cbor.encode(
		new Map<number, number | Buffer>([
			[1, 2],
			[3, -7],
			[-1, 1],
			[-2, x],
			[-3, y],
		]),
	)

	return {
		privateKey: privateKey
			.export({ type: 'pkcs8', format: 'der' })
			.toString('base64'),
		publicKey: cosePublickey,
	}
}

test('authenticates using a passkey', async ({ navigate, page }) => {
	await navigate('/login')

	const { client, authenticatorId } = await createWebAuthnClient(page)

	const keys = generateKeys()
	await using user = await createUser()
	await using passkey = await createPasskey({
		userId: user.id,
		publicKey: keys.publicKey,
	})

	await client.send('WebAuthn.addCredential', {
		authenticatorId,
		credential: {
			rpId: new URL(page.url()).hostname,
			credentialId: passkey.id,
			signCount: 0,
			isResidentCredential: true,
			userName: user.username,
			userHandle: btoa(user.id),
			userDisplayName: user.name ?? user.email,
			privateKey: keys.privateKey,
		},
	})

	await page.getByRole('button', { name: 'Login with a passkey' }).click()

	await expect(page.getByText(user.name!)).toBeVisible()
})
