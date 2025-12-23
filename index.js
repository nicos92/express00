import express from 'express'

import 'dotenv/config'

const app = express()

app.get('/', (req, res) => {
  res.send('hola mundo')
})
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('http://localhost:' + PORT)
})
