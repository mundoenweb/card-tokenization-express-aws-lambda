/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { verifyToken } from './middleware/verifyToken'
import * as controller from './cardController'
import { verifyDataCard } from './middleware/verifiDataCard/verifyDataCard'

const router = express.Router()

router.post('/', verifyDataCard, controller.createToken)
router.get('/', verifyToken, controller.getCard)

export default router
