import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import { UniqueEnforcer } from 'enforce-unique'
import { getPasswordHash } from '#app/utils/auth.server.ts'
import { prisma } from '#app/utils/db.server.ts'

const uniqueUsernameEnforcer = new UniqueEnforcer()

interface TestUserInfo {
	username: string
	name: string
	email: string
}

export function generateUserInfo(info?: Partial<TestUserInfo>): TestUserInfo {
	const firstName = faker.person.firstName()
	const lastName = faker.person.lastName()

	const username =
		info?.username ||
		uniqueUsernameEnforcer
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

	console.log({ username })

	return {
		username,
		name: info?.name || `${firstName} ${lastName}`,
		email: info?.email || `${username}@example.com`,
	}
}

export async function createUser(info?: Partial<TestUserInfo>) {
	const userInfo = generateUserInfo(info)
	const password = 'supersecret'
	const user = await prisma.user.create({
		data: {
			...userInfo,
			password: { create: { hash: await getPasswordHash(password) } },
		},
	})

	return {
		async [Symbol.asyncDispose]() {
			await prisma.user.deleteMany({
				where: { id: user.id },
			})
		},
		...user,
		password,
	}
}

export async function createPasskey(input: {
	id: string
	userId: string
	aaguid: string
	publicKey: Uint8Array<ArrayBuffer>
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
