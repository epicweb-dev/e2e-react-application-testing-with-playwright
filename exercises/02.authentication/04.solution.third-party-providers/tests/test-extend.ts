import { type AppProcess, defineLauncher } from '@epic-web/app-launcher'
import { test as testBase, expect } from '@playwright/test'
import { PrismaClient, type User } from '@prisma/client'
import getPort from 'get-port'
import {
	definePersona,
	combinePersonas,
	type AuthenticateFunction,
} from 'playwright-persona'
import { href, type Register } from 'react-router'
import { getPasswordHash } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import {
	generateUserInfo,
	prepareTestDatabase,
	type TestUserInfo,
} from '#tests/db-utils'

interface Fixtures {
	app: AppProcess
	databasePath: string
	prisma: PrismaClient
	navigate: <T extends keyof Register['pages']>(
		...args: Parameters<typeof href<T>>
	) => Promise<void>
	authenticate: AuthenticateFunction<[typeof user]>
	createUser: (
		info?: Partial<TestUserInfo>,
	) => Promise<AsyncDisposable & User & { password: string }>
}

const user = definePersona('user', {
	async createSession({ page }) {
		const user = await prisma.user.create({
			data: {
				...generateUserInfo(),
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

const launcher = defineLauncher({
	async context() {
		return { port: await getPort() }
	},
	env({ context }) {
		return {
			NODE_ENV: 'test',
			PORT: context.port.toString(),
		}
	},
	command() {
		return 'npm run start:mocks'
	},
	url({ context }) {
		return `http://localhost:${context.port}`
	},
})

export const test = testBase.extend<Fixtures>({
	async databasePath({}, use, testInfo) {
		const databasePath = `./test-${testInfo.testId}.db`
		await use(databasePath)

		await testInfo.attach(databasePath, { path: databasePath })
	},
	async prisma({ databasePath }, use) {
		const prisma = new PrismaClient({
			datasourceUrl: `file:${databasePath}`,
		})
		await use(prisma)
		await prisma.$disconnect()
	},
	async app({ databasePath }, use) {
		prepareTestDatabase(databasePath)

		/**
		 * @todo No need to re-run the whole app on test re-runs.
		 * Would be nice to spawn the app once, then reuse it across re-runs.
		 * Just clear the DB between re-runs, that's crucial.
		 */
		const app = await launcher.run({
			env: () => ({
				// Configure the app's Prisma client to use the scoped database.
				DATABASE_URL: `file:${databasePath}`,
			}),
		})

		await use(app)
		await app.dispose()
	},
	async navigate({ page, app, contextOptions }, use) {
		await use(async (...args) => {
			const url = new URL(href(...args), app.url || contextOptions.baseURL)
			await page.goto(url.href)
		})
	},
	authenticate: combinePersonas(user),
	async createUser({ prisma }, use) {
		await use(async (info) => {
			const userInfo = generateUserInfo(info)
			const password = 'supersecret'
			const user = await prisma.user.create({
				data: {
					...userInfo,
					password: { create: { hash: await getPasswordHash(password) } },
				},
			})

			return {
				async [Symbol.asyncDispose]() {
					await prisma.user.deleteMany({
						where: { id: user.id },
					})
				},
				...user,
				password,
			}
		})
	},
})

export { expect }
