import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
	projects: [
		{
			name: 'Chromium',
			use: devices['Desktop Chrome'],
		},
	],
	use: {
		screenshot: 'only-on-failure',
	},
})
