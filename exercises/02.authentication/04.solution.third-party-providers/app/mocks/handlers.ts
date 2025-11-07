import { Collection } from '@msw/data'
import { http, HttpResponse } from 'msw'
import {
	GitHubUserResponseSchema,
	GitHubEmailSchema,
} from '#app/utils/providers/github.server.ts'

const githubUsers = new Collection({
	schema: GitHubUserResponseSchema,
})

const githubEmails = new Collection({
	schema: GitHubEmailSchema,
})

export const mockGitHubUser = await githubUsers.create({
	id: 1,
	login: 'kody',
	name: 'Kody the Koala',
	email: 'kody@epicweb.dev',
})

export const handlers = [
	http.post('https://github.com/login/oauth/access_token', () => {
		return HttpResponse.json({
			access_token: 'MOCK_ACCESS_TOKEN',
		})
	}),

	http.get('https://api.github.com/user', async () => {
		return HttpResponse.json(mockGitHubUser)
	}),

	http.get('https://api.github.com/user/emails', async () => {
		const email = await githubEmails.create({
			email: mockGitHubUser.email!,
			primary: true,
			verified: true,
			visibility: 'public',
		})

		return HttpResponse.json([email])
	}),
]
