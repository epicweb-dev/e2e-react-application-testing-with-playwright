import { spawnSync } from 'node:child_process'
import { PostgreSqlContainer } from '@testcontainers/postgresql'

export default async function globalSetup() {
	// Spin up a test database instance in a test container.
	const container = await new PostgreSqlContainer('db-dev').start()
	process.env.DATABASE_URL = container.getConnectionUri()

	// Set up Prisma on the test database instance.
	spawnSync('npm', ['run', 'prisma:setup'], {
		stdio: 'inherit',
		shell: true,
	})

	return async () => {
		await container.stop()
	}
}
