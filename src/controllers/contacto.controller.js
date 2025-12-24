import queryString from 'querystring'
export const index = async (req, res) => {
  res.render('contacto')
}
export const submit = async (req, res) => {
  console.log(req.body)
  res.send('enviado')
}
