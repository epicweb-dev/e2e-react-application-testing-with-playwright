import { createNetworkFixture, type NetworkFixture } from '@msw/playwright'
import { test as testBase, expect } from '@playwright/test'
// 🐨 Imoprt the `http` object and the `HttpResponse` class from "msw".
// 💰 import { this, that } from 'package'
import {
	definePersona,
	combinePersonas,
	type AuthenticateFunction,
} from 'playwright-persona'
import { href, type Register } from 'react-router'
import { getPasswordHash } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createUser } from '#tests/db-utils'

interface Fixtures {
	navigate: <T extends keyof Register['pages']>(
		...args: Parameters<typeof href<T>>
	) => Promise<void>
	authenticate: AuthenticateFunction<[typeof user]>
	network: NetworkFixture
}

const user = definePersona('user', {
	async createSession({ page }) {
		const user = await prisma.user.create({
			data: {
				...createUser(),
				roles: { connect: { name: 'user' } },
				password: { create: { hash: await getPasswordHash('supersecret') } },
			},
		})

		await page.goto('/login')
		await page.getByLabel('Username').fill(user.username)
		await page.getByLabel('Password').fill('supersecret')
		await page.getByRole('button', { name: 'Log in' }).click()
		await page.getByText(user.name!).waitFor({ state: 'visible' })

		return { user }
	},
	async verifySession({ page, session }) {
		await page.goto('/')
		await expect(page.getByText(session.user.name!)).toBeVisible({
			timeout: 100,
		})
	},
	async destroySession({ session }) {
		await prisma.user.deleteMany({ where: { id: session.user.id } })
	},
})

export const test = testBase.extend<Fixtures>({
	async navigate({ page }, use) {
		await use(async (...args) => {
			await page.goto(href(...args))
		})
	},
	authenticate: combinePersonas(user),
	network: createNetworkFixture({
		initialHandlers: [
			// 🐨 Add a new handler for a GET request to the "https://assets.onedollarstats.com" URL.
			// Capture all the requests to that URL by using a wildcard "*".
			// 💰 http.get(path, resolver)
			//
			// 🐨 In the resolver for that handler, return an empty response.
			// 💰 new HttpResponse()
		],
	}),
})

export { expect }
