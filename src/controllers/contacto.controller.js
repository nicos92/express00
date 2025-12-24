import queryString from 'querystring'
import Nodemailer from 'nodemailer'

// 1. Crear el transportador (configuración del servidor SMTP)
const transporter = Nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.AGPMIAL, // La que generaste en el paso 1
  },
})

export const index = async (req, res) => {
  res.render('contacto')
}
export const submit = async (req, res) => {
  console.log(req.body)
  // 2. Definir el contenido del correo
  const mailOptions = {
    from: `${req.body.txtEmail}`,
    to: process.env.GMAIL_USER,
    subject: 'Prueba desde Node.js',
    //text: '¡Hola! Este es un correo enviado usando Nodemailer y Gmail.',
    // También puedes enviar HTML:
    html: `<h1>De: ${req.body.txtnombre}</h1><h3>Email:${req.body.txtEmail}</h3><h3>Mensaje:</h3><p>${req.body.txtMsj}</p>`,
  }
  // 3. Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error al enviar:', error)
    }
    console.log('Correo enviado con éxito:', info.response)
  })

  res.render('contacto')
}
