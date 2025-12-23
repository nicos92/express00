import express from 'express'
const mainRouter = express.Router()

import { index } from '../controllers/main.controller.js'

mainRouter.get('/', index)

export default mainRouter
