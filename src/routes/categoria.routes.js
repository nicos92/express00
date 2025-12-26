import express from 'express'
const categoriaRouter = express.Router()
import {
  getAll,
  getById,
  formCreate,
  create,
  formEdit,
  edit,
  deleteCategoria,
} from '../controllers/categoria.controller.js'

categoriaRouter.get('/create', formCreate)
categoriaRouter.post('/', create)
categoriaRouter.get('/', getAll)
categoriaRouter.get('/:id', getById)
categoriaRouter.get('/:id/edit', formEdit)
categoriaRouter.put('/:id', edit)
categoriaRouter.delete('/:id', deleteCategoria)

export default categoriaRouter
