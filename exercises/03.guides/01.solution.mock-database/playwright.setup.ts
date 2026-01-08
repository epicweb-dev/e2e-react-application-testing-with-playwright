import { spawnSync } from 'node:child_process'

export default function globalSetup() {
	spawnSync('npx', ['prisma', 'migrate', 'reset', '--force', '--skip-seed'], {
		stdio: 'inherit',
		shell: true,
	})

	spawnSync('npm', ['run', 'prisma:setup'], {
		stdio: 'inherit',
		shell: true,
	})
}
