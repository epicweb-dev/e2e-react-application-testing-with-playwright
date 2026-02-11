import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import { UniqueEnforcer } from 'enforce-unique'

const uniqueUsernameEnforcer = new UniqueEnforcer()

export function createUser() {
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

// 🐨 Declare and export an asynchronous function called `createNotes`.
// 💰 export async function createNotes(args)
//
// 🐨 Annotate the `args` argument of the `createNotes` function to be
// of the following type:
// { ownerId: string, notes: Array<Omit<Prisma.NoteCreateManyInput, 'ownerId'>> }
//
// 🐨 In the body of the `createNotes` function, declare a variable called "notes".
// As the value for this variable, assign the result of creating multiple
// notes in the database.
// 💰 const notes = await prisma.note.createManyAndReturn({})
//
// 🐨 In the argument to the `createManyAndReturn` method call, provide the "data"
// key. As the value for the "data" key, iterate over `args.notes` and compose an
// object of the following shape:
// { ownerId: args.ownerId, ...note }
// 💰 { data: args.notes.map((note) => ({ ... })) }
//
// 🐨 From the `createNotes` function, return an object that has a key "values".
// Assign the `notes` variable as the value of the "values" key.
// 💰 return { this: that }
//
// 🐨 In the object returned from the `createNotes` function, add an asynchronous
// method that uses `Symbol.asyncDispose` as its dynamic key name. This will make
// the `createNotes` utility disposable so you can delete the notes you've created
// once this utility gets garbage-collected.
// 💰 return { async[Symbol.asyncDispose]() {} }
//
// 🐨 In the asynchronous dispose callback, use the `prisma` client to delete
// the notes where the owner id is `args.ownerId`.
// 💰 await prisma.note.deleteMany({ where: {} })
