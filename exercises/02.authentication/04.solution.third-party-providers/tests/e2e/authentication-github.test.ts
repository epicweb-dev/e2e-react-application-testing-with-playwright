import { mockGitHubUser } from '#app/mocks/handlers.ts'
import { test, expect } from '#tests/test-extend.ts'

test('onboards a new GitHub user', async ({ app, navigate, page }) => {
	await navigate('/login')
	await page.getByRole('button', { name: 'Login with GitHub' }).click()

	await expect(
		page.getByRole('heading', {
			name: `Welcome aboard ${mockGitHubUser.email}!`,
		}),
	).toBeVisible()

	await expect(page.getByLabel('Username'), 'Infers the username').toHaveValue(
		mockGitHubUser.login,
	)
	await expect(
		page.getByLabel('Name', { exact: true }),
		'Infers the name',
	).toHaveValue(mockGitHubUser.name!)

	// Finish the onboarding.
	await page
		.getByRole('checkbox', {
			name: 'I agree to the Terms of Service and Privacy Policy',
		})
		.check()
	await page.getByRole('button', { name: 'Create an account' }).click()

	await expect(
		page.getByRole('link', { name: mockGitHubUser.name }),
	).toBeVisible()
	await expect(page.getByText('Thanks for signing up!')).toBeVisible()
})

test('authenticates the user with a connected GitHub account', async ({
	app,
	createUser,
	navigate,
	page,
}) => {
	await using user = await createUser({
		name: mockGitHubUser.name,
		username: mockGitHubUser.login,
		email: mockGitHubUser.email,
	})

	await navigate('/login')
	await page.getByRole('button', { name: 'Login with GitHub' }).click()

	await expect(page.getByRole('link', { name: user.name! })).toBeVisible()
	await expect(
		page.getByText('Your "kody" GitHub account has been connected'),
	).toBeVisible()
})
