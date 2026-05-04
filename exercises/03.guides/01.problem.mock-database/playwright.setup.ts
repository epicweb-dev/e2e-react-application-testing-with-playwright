import { spawnSync } from 'node:child_process'

// 🐨 Declare a function called "globalSetup" and export it as default.
// 💰 export default function name() {}

// 🐨 In the "globalSetup" function, use "spawnSync" to spawn the
// "prisma" command with these arguments: "generate", "--sql".
// This will generate the Prisma client for our test database.
// 💰 spawnSync(command, [arg1, arg2])

// 🐨 Next, let's reset the database state before running the tests.
// Call "spawnSync" again with "prisma" as the command and these arguments:
// "migrate", "reset", "--force", "--skip-seed".

// 🐨 For better observability, provide the "stdio" option to both "spawnSync"
// calls and set its value to "inherit". This will pipe any standard output
// and error from the spawned commands to the Playwright process for you to see.
// 💰 spawnSync(command, [arg1, arg2, ...], options)
