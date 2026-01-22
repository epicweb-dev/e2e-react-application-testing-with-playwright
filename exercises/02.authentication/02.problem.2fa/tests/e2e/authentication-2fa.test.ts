import { generateTOTP } from '@epic-web/totp'
import { createUser, createVerification } from '#tests/db-utils.ts'
import { test, expect } from '#tests/test-extend.ts'

test('authenticates using two-factor authentication', async ({
	navigate,
	page,
}) => {
	/** @todo Instructions */
})
