import express from 'express'
import cardRouter from '../components/card/cardRouter'
const router = express.Router()

router.use(cardRouter)

export default router
