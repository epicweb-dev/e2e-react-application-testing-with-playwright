import fs from 'node:fs'

const TEST_COUNT = 500

/**
 * @param {URL} exerciseDirectory
 * @param {number} count
 */
async function generateTests(exerciseDirectory, count) {
	const TESTS_DIR = new URL('./tests/', exerciseDirectory)

	const existingTests = fs.globSync('*.test.ts', {
		cwd: TESTS_DIR.pathname,
	})
	await Promise.all(
		existingTests.map((filename) => {
			return fs.promises.rm(new URL(filename, TESTS_DIR))
		}),
	)

	await Promise.all(
		Array.from({ length: count }).map((_, index) => {
			const realIndex = index + 1
			const filename = `./test-${realIndex.toString().padStart(count.toString().length, '0')}.test.ts`
			const contents = `\
test('equals to ${realIndex}', ({ expect }) => {
	expect(${realIndex}).toBe(${realIndex})
})
`

			return fs.promises.writeFile(
				new URL(filename, TESTS_DIR),
				contents,
				'utf8',
			)
		}),
	)
}

Promise.all([
	generateTests(
		new URL(
			'../exercises/04.performance/03.problem.test-isolation/',
			import.meta.url,
		),
		TEST_COUNT,
	),
	generateTests(
		new URL(
			'../exercises/04.performance/03.solution.test-isolation/',
			import.meta.url,
		),
		TEST_COUNT,
	),
	generateTests(
		new URL(
			'../exercises/04.performance/04.problem.sharding/',
			import.meta.url,
		),
		TEST_COUNT,
	),
	generateTests(
		new URL(
			'../exercises/04.performance/04.solution.sharding/',
			import.meta.url,
		),
		TEST_COUNT,
	),
]).catch((error) => {
	console.error('❌  Failed to generate tests.\n\n', error)
	process.exit(1)
})
