import { test as testBase, expect } from '@playwright/test'
import { href, type Register } from 'react-router'

interface Fixtures {
	navigate: <T extends keyof Register['pages']>(
		...args: Parameters<typeof href<T>>
	) => Promise<void>
}

export const test = testBase.extend<Fixtures>({
	async navigate({ page }, use) {
		await use(async (...args) => {
			await page.goto(href(...args))
		})
	},
})

export { expect }
