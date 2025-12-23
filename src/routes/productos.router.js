import express from 'express'
const productosRouter = express.Router()
import { getAll, getId } from '../controllers/productos.controller.js'

productosRouter.get('/', getAll)

productosRouter.get('/:id', getId)

export default productosRouter
