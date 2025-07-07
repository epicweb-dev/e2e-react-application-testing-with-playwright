import { test, expect } from '#tests/test-extend.ts'

test('...', async ({ navigate }) => {
	await navigate('/login')
	await navigate('/users/:username/notes')
})
