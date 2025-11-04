import { test, expect } from '#tests/test-extend.ts'

test('authenticates using two-factor authentication', async ({
	navigate,
	authenticate,
	page,
}) => {
	/**
	 * @fixme Don't make it a persona. People can make it a persona if they want to
	 * test authenticated state functionality while having OTP (e.g. deleting a post requires 2FA).
	 *
	 * In this test, just do:
	 * - createUser()
	 * - createVerification()
	 * - Regular login flow.
	 */
	const { user } = await authenticate({ as: 'user-with-2fa' })

	await navigate('/login')

	// ...
})
