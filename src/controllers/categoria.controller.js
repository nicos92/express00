import { randomUUID } from 'node:crypto'
import queryString from 'node:querystring'

const categorias = [
  { id: randomUUID(), categoria: 'categoria 1' },
  { id: randomUUID(), categoria: 'categoria 2' },
  { id: randomUUID(), categoria: 'categoria 3' },
  { id: randomUUID(), categoria: 'categoria 4' },
]
export const getAll = async (req, res) => {
  res.render('categorias/index', { categorias })
}

export const getById = async (req, res) => {
  const { id } = req.params
  const categoria = categorias.find((c) => c.id == id)

  res.render('categorias/categoria', { categoria })
}

export const formCreate = async (req, res) => {
  res.render('categorias/create')
}

export const create = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('No se ingresaron datos')
  }
  const { categoria } = req.body
  const nuevaCategoria = {
    id: randomUUID(),
    categoria,
  }

  categorias.push(nuevaCategoria)
  res.redirect('/categorias')
}

export const formEdit = async (req, res) => {
  const { id } = req.params
  const categoria = categorias.find((c) => c.id == id)
  if (!categoria) {
    return res.status(404).send('La categoria no existe')
  }

  res.render('categorias/edit', { categoria })
}

export const edit = async (req, res) => {
  const { id } = req.params
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send('Se requieren datos')
  }
  const nuevaCategoria = req.body.categoria
  const categoria = categorias.find((c) => c.id == id)
  if (!categoria) {
    return res.status(400).send('No se puede editar, la categoria no existe')
  }

  categoria.categoria = nuevaCategoria
  return res.redirect('/categorias')
}

export const deleteCategoria = async (req, res) => {
  const { id } = req.params
  const idx = categorias.findIndex((c) => c.id == id)

  if (idx === -1) {
    return res.status(400).send('No se puede eliminar, la categoria no existe')
  }

  categorias.splice(idx, 1)

  res.redirect('/categorias')
}
