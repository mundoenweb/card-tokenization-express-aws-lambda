import express from 'express'
import { verifyTokenPay } from '../../middleware/verifyTokenPay'
import * as controller from './cardController'

const router = express.Router()

router.post('/', controller.createToken)
router.get('/', verifyTokenPay, controller.getCard)

export default router
