import express from 'express'
import { verifyTokenPay } from '../../middleware/verifyTokenPay'
import * as controller from './cardController'
import { verifyDataCard } from './middleware/verifiDataCard/verifyDataCard'

const router = express.Router()

router.post('/', verifyDataCard, controller.createToken)
router.get('/', verifyTokenPay, controller.getCard)

export default router
