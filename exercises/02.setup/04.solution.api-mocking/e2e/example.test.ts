import { http } from 'msw'
import { test } from '../test-extend'

test('...', async ({ network, page }) => {
	network.use(http.get('/resource', () => {}))

	await page.goto('/')

	// ...
})
