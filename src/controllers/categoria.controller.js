import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rutaArchivo = path.resolve(__dirname, '../../categorias.json')

// Función auxiliar para leer el archivo de forma segura
const leerCategorias = async () => {
  try {
    const data = await fs.readFile(rutaArchivo, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Si el archivo no existe, retornamos un array vacío o los valores por defecto
    console.log('Creando nuevo archivo de categorías...')
    return []
  }
}

export const getAll = async (req, res) => {
  try {
    // Leemos siempre del archivo para tener la data actualizada
    const categorias = await leerCategorias()
    res.render('categorias/index', { categorias })
  } catch (error) {
    res.status(500).send('Error al cargar las categorías')
  }
}

export const getById = async (req, res) => {
  const { id } = req.params

  try {
    const categorias = await leerCategorias()

    const categoria = categorias.find((c) => c.id === id)

    if (!categoria) {
      return res
        .status(404)
        .render('404', { mensaje: 'Categoría no encontrada' })
    }

    res.render('categorias/categoria', { categoria })
  } catch (error) {
    console.error('Error al obtener la categoría:', error)
    res.status(500).send('Error interno del servidor')
  }
}

export const formCreate = async (req, res) => {
  res.render('categorias/create')
}

export const create = async (req, res) => {
  if (!req.body?.categoria) {
    return res.status(400).send('No se ingresaron datos')
  }

  try {
    // 1. Obtener los datos actuales
    const categorias = await leerCategorias()

    // 2. Agregar la nueva categoría
    const nuevaCategoria = {
      id: randomUUID(),
      categoria: req.body.categoria,
    }
    categorias.push(nuevaCategoria)

    // 3. Guardar el array completo actualizado
    await fs.writeFile(rutaArchivo, JSON.stringify(categorias, null, 2))

    res.redirect('/categorias')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al guardar')
  }
}

export const formEdit = async (req, res) => {
  try {
    const { id } = req.params
    const categorias = await leerCategorias()

    const categoria = categorias.find((c) => c.id == id)
    if (!categoria) {
      return res.status(404).send('La categoria no existe')
    }

    res.render('categorias/edit', { categoria })
  } catch (e) {
    res.status(500).send('Error interno al ingresar a la categoría')
  }
}

export const edit = async (req, res) => {
  const { id } = req.params
  const { categoria: nombreActualizado } = req.body

  if (!nombreActualizado) {
    return res.status(400).send('El nombre de la categoría es requerido')
  }

  try {
    const categorias = await leerCategorias()

    const indice = categorias.findIndex((c) => c.id === id)

    if (indice === -1) {
      return res.status(404).send('Categoría no encontrada')
    }

    categorias[indice].categoria = nombreActualizado

    await fs.writeFile(rutaArchivo, JSON.stringify(categorias, null, 2))

    res.redirect('/categorias')
  } catch (error) {
    res.status(500).send('Error interno al actualizar la categoría')
  }
}

export const deleteCategoria = async (req, res) => {
  const { id } = req.params

  try {
    // 1. Leer los datos actuales del archivo
    const categorias = await leerCategorias()

    // 2. Buscar el índice
    const idx = categorias.findIndex((c) => c.id === id)

    if (idx === -1) {
      return res
        .status(404)
        .send('No se puede eliminar, la categoría no existe')
    }

    // 3. Eliminar del array en memoria
    categorias.splice(idx, 1)

    // 4. Guardar los cambios en el archivo
    await fs.writeFile(
      rutaArchivo,
      JSON.stringify(categorias, null, 2),
      'utf-8'
    )

    // 5. Redirigir
    res.redirect('/categorias')
  } catch (error) {
    console.error('Error al eliminar:', error)
    res.status(500).send('Error interno al intentar eliminar')
  }
}
