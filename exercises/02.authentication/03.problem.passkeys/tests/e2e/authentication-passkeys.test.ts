import { type Page } from '@playwright/test'
import { createTestPasskey } from 'test-passkey'
import { createPasskey, createUser } from '#tests/db-utils.ts'
import { test, expect } from '#tests/test-extend.ts'

async function createWebAuthnClient(page: Page) {
	/** @todo */
}

test('authenticates using an existing passkey', async ({ navigate, page }) => {
	await navigate('/login')

	/** @todo */
})

test('displays an error when authenticating via a passkey fails', async ({
	navigate,
	page,
}) => {
	await navigate('/login')

	/** @todo */
})
