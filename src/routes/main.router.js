import express from 'express'
const mainRouter = express.Router()

import { index, vprivate } from '../controllers/main.controller.js'

mainRouter.get('/', index)

mainRouter.get('/private', vprivate)

export default mainRouter
