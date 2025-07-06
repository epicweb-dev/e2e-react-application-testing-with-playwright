import { test as testBase, expect } from '@playwright/test'
import { type Register, generatePath } from 'react-router'

type Pages = Register['pages']

type Routes<P extends Record<string, any>> = {
	[K in keyof P]: K & string
}[keyof P] & {}

type Params<
	R extends string,
	Pages extends Record<string, any>,
> = keyof Pages[R]['params'] extends never ? never : Pages[R]['params']

interface Fixtures {
	navigate: <R extends Routes<Pages>>(
		...args: [Params<R, Pages>] extends [never]
			? [route: R, params?: never]
			: [route: R, params: Params<R, Pages>]
	) => Promise<void>
}

export const test = testBase.extend<Fixtures>({
	async navigate({ page }, use) {
		await use(
			async (
				...args:
					| [route: string, route?: never]
					| [route: string, params: Record<string, any>]
			) => {
				const [route, params] = args
				await page.goto(generatePath(route, params))
			},
		)
	},
})

export { expect }
