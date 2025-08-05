import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const { EPICSHOP_PLAYGROUND_SRC_DIR, EPICSHOP_PLAYGROUND_DEST_DIR } =
	process.env

async function postPlaygroundHook() {
	const packageJsonPath = path.join(EPICSHOP_PLAYGROUND_SRC_DIR, 'package.json')

	if (!fs.existsSync(packageJsonPath)) {
		return
	}

	const packageJsonContents = await fs.promises.readFile(
		packageJsonPath,
		'utf8',
	)

	if (packageJsonContents.includes('"post:playground"')) {
		spawnSync('npm', ['run', 'post:playground'], {
			cwd: EPICSHOP_PLAYGROUND_DEST_DIR,
		})
	}
}

postPlaygroundHook()
