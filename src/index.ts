import express from 'express'
import morgan from 'morgan'

const app = express()
const PORT = Number(process.env.PORT ?? 5000)
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({ hello: 'World!' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`)
})
