import { test, expect } from '#tests/test-extend.ts'

test('saves changes to the name of the user', async ({
	navigate,
	authenticate,
	page,
}) => {
	await authenticate({ as: 'user' })
	await navigate('/settings/profile')
})
