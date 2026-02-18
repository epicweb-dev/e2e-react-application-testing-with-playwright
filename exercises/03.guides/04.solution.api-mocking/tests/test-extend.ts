import { defineNetworkFixture, type NetworkFixture } from '@msw/playwright'
import { test as testBase, expect } from '@playwright/test'
import { type AnyHandler } from 'msw'
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
	handlers: Array<AnyHandler>
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
	handlers: [[], { option: true }],
	network: [
		async ({ context, handlers }, use) => {
			const network = defineNetworkFixture({
				context,
				handlers,
			})
			await network.enable()
			await use(network)
			await network.disable()
		},
		{ auto: true },
	],
})

export { expect }
