import express from 'express'
import morgan from 'morgan'
import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

const db = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})
const genId = () => nanoid(16)

const seedDatabase = async () => {
  if ((await db.post.count()) === 0) {
    await db.post.createMany({
      data: [
        {
          id: genId(),
          slug: 'node-stack',
          title: 'First Noe Stack Post',
          content: 'This is the first post',
          createdAt: new Date(),
        },
        {
          id: genId(),
          slug: 'hello-world-2',
          title: 'Second Post',
          content: 'This is the second post',
        },
      ],
    })
  }
}

seedDatabase()

const app = express()
const PORT = Number(process.env.PORT ?? 5000)
app.use(morgan('dev'))

app.get('/', async (req, res) => {
  const posts = await db.post.findMany()
  res.json(posts)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`)
})
