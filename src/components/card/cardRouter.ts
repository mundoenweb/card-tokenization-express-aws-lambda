import express from 'express'
import * as controller from './cardController'

const router = express.Router()

router.post('/token', controller.createToken)
router.get('/card', controller.createToken)

export default router
