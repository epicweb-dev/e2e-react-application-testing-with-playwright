import { generateTOTP } from '@epic-web/totp'
import { test as testBase, expect } from '@playwright/test'
import {
	definePersona,
	combinePersonas,
	type AuthenticateFunction,
} from 'playwright-persona'
import { href, type Register } from 'react-router'
import { twoFAVerifyVerificationType } from '#app/routes/settings+/profile.two-factor.verify.tsx'
import { getPasswordHash } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'
import { createUser } from '#tests/db-utils'

interface Fixtures {
	navigate: <T extends keyof Register['pages']>(
		...args: Parameters<typeof href<T>>
	) => Promise<void>
	authenticate: AuthenticateFunction<[typeof user, typeof userWith2fa]>
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

const userWith2fa = definePersona('user-with-2fa', {
	async createSession({ page }, testInfo) {
		const defaultUserPersona = await user.createSession({ page }, testInfo)

		const totp = await generateTOTP()
		const verification = await prisma.verification.create({
			data: {
				...totp,
				type: twoFAVerifyVerificationType,
				target: defaultUserPersona.user.id,
			},
		})

		return {
			user: defaultUserPersona.user,
			verification,
		}
	},
	verifySession: user.verifySession,
	async destroySession({ session }) {
		await Promise.allSettled([
			prisma.user.deleteMany({
				where: { id: session.user.id },
			}),
			prisma.verification.deleteMany({
				where: { id: session.verification.id },
			}),
		])
	},
})

export const test = testBase.extend<Fixtures>({
	async navigate({ page }, use) {
		await use(async (...args) => {
			await page.goto(href(...args))
		})
	},
	authenticate: combinePersonas(user, userWith2fa),
})

export { expect }
