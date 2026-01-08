import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import { UniqueEnforcer } from 'enforce-unique'
import { getPasswordHash } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

const uniqueUsernameEnforcer = new UniqueEnforcer()

export function generateUserInfo() {
	const firstName = faker.person.firstName()
	const lastName = faker.person.lastName()

	const username = uniqueUsernameEnforcer
		.enforce(() => {
			return (
				faker.string.alphanumeric({ length: 2 }) +
				'_' +
				faker.internet.username({
					firstName: firstName.toLowerCase(),
					lastName: lastName.toLowerCase(),
				})
			)
		})
		.slice(0, 20)
		.toLowerCase()
		.replace(/[^a-z0-9_]/g, '_')

	return {
		username,
		name: `${firstName} ${lastName}`,
		email: `${username}@example.com`,
	}
}

// 🐨 Implement the `createUser` function to help you create
// a test user and clean up after it's no longer needed.
export async function createUser() {
	// 🐨 Generate user information by calling the `generateUserInfo` function
	// and assigning its result into a `userInfo` variable.
	// 💰 const userInfo = fn()
	//
	// 🐨 Declare a `password` variable and assign it a test password.
	// 💰 const password = 'supersecret'
	//
	// 🐨 Create a user record in the database, using Prisma.
	// 💰 const user = await prisma.user.create({
	//   data: {
	//     ...userInfo,
	//     password: { create: { hash: await getPasswordHash(password) } },
	//   }
	// })
	//
	// 🐨 Return the `user` object, combining it with the `password`.
	// 💰 return { ...user, password }
	//
	// 🐨 In the returned object, add a property `[Symbol.asyncDispose]`.
	// As the value, provide an asynchronous function to it that deletes
	// the test user you've created.
	// 🦉 Use the `.deleteMany()` method in Prisma for graceful deletions.
	// 💰 async [Symbol.asyncDispose]() {
	//   await prisma.user.deleteMany({ where: { id: user.id } })
	// }
}

export async function createPasskey(input: {
	id: string
	userId: string
	aaguid: string
	publicKey: Uint8Array
	counter?: number
}) {
	const passkey = await prisma.passkey.create({
		data: {
			id: input.id,
			aaguid: input.aaguid,
			userId: input.userId,
			publicKey: input.publicKey,
			backedUp: false,
			webauthnUserId: input.userId,
			deviceType: 'singleDevice',
			counter: input.counter || 0,
		},
	})

	return {
		async [Symbol.asyncDispose]() {
			await prisma.passkey.deleteMany({
				where: {
					id: passkey.id,
				},
			})
		},
		...passkey,
	}
}

export function createPassword(password: string = faker.internet.password()) {
	return {
		hash: bcrypt.hashSync(password, 10),
	}
}

let noteImages: Array<{ altText: string; objectKey: string }> | undefined
export async function getNoteImages() {
	if (noteImages) return noteImages

	noteImages = await Promise.all([
		{
			altText: 'a nice country house',
			objectKey: 'notes/0.png',
		},
		{
			altText: 'a city scape',
			objectKey: 'notes/1.png',
		},
		{
			altText: 'a sunrise',
			objectKey: 'notes/2.png',
		},
		{
			altText: 'a group of friends',
			objectKey: 'notes/3.png',
		},
		{
			altText: 'friends being inclusive of someone who looks lonely',
			objectKey: 'notes/4.png',
		},
		{
			altText: 'an illustration of a hot air balloon',
			objectKey: 'notes/5.png',
		},
		{
			altText:
				'an office full of laptops and other office equipment that look like it was abandoned in a rush out of the building in an emergency years ago.',
			objectKey: 'notes/6.png',
		},
		{
			altText: 'a rusty lock',
			objectKey: 'notes/7.png',
		},
		{
			altText: 'something very happy in nature',
			objectKey: 'notes/8.png',
		},
		{
			altText: `someone at the end of a cry session who's starting to feel a little better.`,
			objectKey: 'notes/9.png',
		},
	])

	return noteImages
}

let userImages: Array<{ objectKey: string }> | undefined
export async function getUserImages() {
	if (userImages) return userImages

	userImages = await Promise.all(
		Array.from({ length: 10 }, (_, index) => ({
			objectKey: `user/${index}.jpg`,
		})),
	)

	return userImages
}
