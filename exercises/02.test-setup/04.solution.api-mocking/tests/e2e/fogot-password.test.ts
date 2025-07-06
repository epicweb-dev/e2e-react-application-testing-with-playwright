import { http } from 'msw'
import { test, expect } from '#tests/test-extend.ts'

test('...', async ({ network, page }) => {
	/**
	 * @fixme `network` has to be `setupRemoteServer` instance
	 * for it to receive remote requests. Or, have a concept of
	 * a RemoteInterceptor you can initialize anywhere.
	 */
	return network.boundary(async () => {
		network.use()
	})()

	network.use(
		http.post('/forgot-password*', () => {
			console.log('FORGOT PASSWORD REQUEST!')
		}),
	)

	await page.goto('/forgot-password')
	await page.getByLabel('Username or Email').fill('john.doe@mail.com')
	await page.getByRole('button', { name: 'Recover password' }).click()

	await page.waitForTimeout(2_000)
	/** @todo Actions, assertions... */
})
