import { type Prisma } from '@prisma/client'
import { prisma } from '#app/utils/db.server.ts'

export async function createNotes(args: {
	ownerId: string
	data: Array<Omit<Prisma.NoteCreateManyInput, 'ownerId'>>
}) {
	const notes = await prisma.note.createManyAndReturn({
		data: args.data.map((data) => {
			return {
				ownerId: args.ownerId,
				...data,
			}
		}),
	})

	return {
		async [Symbol.asyncDispose]() {
			await prisma.note.deleteMany({
				where: {
					id: {
						in: notes.map((note) => note.id),
					},
				},
			})
		},
		values: notes,
	}
}
