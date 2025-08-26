import { type Prisma } from '@prisma/client'
import { prisma } from '#app/utils/db.server.ts'

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
