import express from 'express'
import { verifyTokenPay } from '../../middleware/verifyTokenPay'
import * as controller from './cardController'

const router = express.Router()

router.get('/card', verifyTokenPay, controller.getCard)
router.post('/card/token', controller.createToken)

export default router
