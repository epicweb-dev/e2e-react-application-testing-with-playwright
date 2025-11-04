import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

const PORT = process.env.PORT || '3000'

export default defineConfig({
	testDir: './tests/e2e',
	timeout: 15 * 1000,
	expect: {
		timeout: 5 * 1000,
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: `http://localhost:${PORT}/`,
		trace: 'on-first-retry',
	},

	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		},
	],

	// 🐨 Add a property called "webServer" and provide an object as its value.
	// 💰 webServer: {}

	// 🐨 In the "webServer" object, add a property called "command".
	// Playwright will run this command before the test run.
	// Specify "npm run dev" as the command.
	// 💰 command: "VALUE"

	// 🐨 In the "webServer" object, add another property called "port".
	// Playwright will await a connection on this port to know that your app is up.
	// Provide the `PORT` variable as the value for this property.
	// (Do not forget to cast it to number!)
	// 💰 port: VALUE

	// 🐨 In the "webServer" object, add two properties: "stdout" and "stderr".
	// These properties tell Playwright how to manage stdout and stderr of the
	// process that spawns your command.
	// Assign the string "pipe" as the value for both of these properties.
	// 💰 stdout: "VALUE"
	// 💰 stderr: "VALUE"

	// 🐨 Finally, in the "webServer" object, add a property called "env".
	// Playwright provide the keys/values of this object as environment variables
	// to the process that spawns your app.
	// In the "env" object, speicify the following entries:
	// - "PORT" with the value of the existing "PORT" variable;
	// - "NODE_ENV" with the value of "test" string.
})
