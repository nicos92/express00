import express from 'express'

import 'dotenv/config'

import mainRouter from './src/routes/main.router.js'
import productosRouter from './src/routes/productos.router.js'

const app = express()

app.use(mainRouter)
app.use('/productos', productosRouter)
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('http://localhost:' + PORT)
})
