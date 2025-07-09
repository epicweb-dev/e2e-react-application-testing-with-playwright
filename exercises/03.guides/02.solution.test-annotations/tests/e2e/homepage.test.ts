import { test, expect } from '#tests/test-extend'

test(
	'displays the welcome heading',
	{
		tag: ['@homepage'],
		annotation: {
			type: 'issue',
			description: 'https://github.com/epicweb-dev/epic-stack/issues/1020',
		},
	},
	async ({ navigate, page }) => {
		await navigate('/')

		await expect(
			page.getByRole('heading', { name: 'The Most Epic of Stacks' }),
		).toBeVisible()
	},
)
