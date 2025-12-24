import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
import express from 'express'
import layouts from 'express-ejs-layouts'
import 'dotenv/config'

import mainRouter from './src/routes/main.router.js'
import productosRouter from './src/routes/productos.router.js'

const app = express()
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'))

app.use(layouts)
app.set('layout', 'layouts/layout')

app.use(mainRouter)
app.use('/productos', productosRouter)
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('http://localhost:' + PORT)
})
