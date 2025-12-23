import queryString from 'querystring'
export const getAll = async (req, res) => {
  const query = queryString.stringify(req.query)
  const respose = await fetch(`https://fakestoreapi.com/products?${query}`)
  const productos = await respose.json()
  res.render('productos', { productos })
}

export const getId = async (req, res) => {
  const { id } = req.params
  const respose = await fetch(`https://fakestoreapi.com/products/${id}`)
  const data = await respose.json()
  res.json(data)
}
