import {
  NextFunction as Next,
  Request as Req,
  Response as Res
} from 'express'
import { validateData } from './utils/validateData'

const createToken = (req: Req, res: Res, next: Next): void => {
  const card = validateData(req.body, req, next)
  if (card === null) return next()

  res.status(200).json({ token: 'ds5fs5df4', card })
}
const getCard = (_req: Req, _res: Res): null => {
  return null
}

export {
  createToken,
  getCard
}
