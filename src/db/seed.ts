import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { questions } from './schema/questions.ts'
// import { schema } from './schema/index.ts'
import { rooms } from './schema/rooms.ts'

const seedSchema = { rooms, questions }

await reset(db, seedSchema)

await seed(db, seedSchema).refine((f) => {
   return {
      rooms: {
         count: 3,
         columns: {
            name: f.companyName(),
            description: f.loremIpsum(),
            createdAt: f.date({
               minDate: new Date('2025-01-01'),
               maxDate: new Date(),
            }),
         },
         with: {
            questions: 3,
         },
      },
   }
})

await sql.end()

// biome-ignore lint/suspicious/noConsole: <only used in development>
console.log('Database seeded...🌱')
