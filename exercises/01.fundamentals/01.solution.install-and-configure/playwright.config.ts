import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		},
	],
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	workers: process.env.CI ? 1 : undefined,
})
