import { spawnSync } from 'node:child_process'

export default function globalSetup() {
	spawnSync('prisma', ['generate', '--sql'], {
		stdio: 'inherit',
	})

	spawnSync('prisma', ['migrate', 'reset', '--force', '--skip-seed'], {
		stdio: 'inherit',
	})
}
