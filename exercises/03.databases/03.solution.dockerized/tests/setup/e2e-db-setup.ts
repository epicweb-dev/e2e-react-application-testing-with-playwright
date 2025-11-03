import { spawnSync } from 'node:child_process'
import { PostgreSqlContainer } from '@testcontainers/postgresql'

async function setupDatabase() {
	// Spin up a test database instance in a test container.
	const container = await new PostgreSqlContainer('db-dev').start()
	process.env.DATABASE_URL = container.getConnectionUri()

	// Set up Prisma on the test database instance.
	spawnSync('npm', ['run', 'prisma:setup'], {
		stdio: 'inherit',
		shell: true,
	})

	console.log(new Date(), 'SETUP DONE!')
}

setupDatabase()
