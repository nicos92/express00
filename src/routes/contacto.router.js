import express from 'express'

const router = express.Router()
import { index, submit } from '../controllers/contacto.controller.js'

router.get('/', index)
router.post('/', submit)

export default router
