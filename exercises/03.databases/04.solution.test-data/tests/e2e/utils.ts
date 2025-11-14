import { type Prisma } from '@prisma/client'
import { prisma } from '#app/utils/db.server.ts'

export async function createNotes(args: {
	ownerId: string
	notes: Array<Omit<Prisma.NoteCreateManyInput, 'ownerId'>>
}) {
	const notes = await prisma.note.createManyAndReturn({
		data: args.notes.map((note) => {
			return {
				ownerId: args.ownerId,
				...note,
			}
		}),
	})

	return {
		async [Symbol.asyncDispose]() {
			await prisma.note.deleteMany({
				where: { ownerId: args.ownerId },
			})
		},
		values: notes,
	}
}
