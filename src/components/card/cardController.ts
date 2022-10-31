import {
  NextFunction as Next,
  Request as Req,
  Response as Res
} from 'express'
import { genereteToken } from './utils/genereteToken'
import { validateData } from './utils/validateData'
import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'
import * as models from './cardModel'
import { helperResponse } from '../../utils/helperResponse'

const SECRET_PASSWORD = 'secretPass.3467'

const createToken = (req: Req, res: Res, next: Next): void => {
  const card = validateData(req.body, req, next)
  if (card === null) return next()

  const token: string = genereteToken(16)
  const config = { expiresIn: 900 }

  jwt.sign({ card }, SECRET_PASSWORD, config, (err, result) => {
    if (err !== null) {
      const r: any = req
      r.error = createHttpError(500, err.message)
      return next()
    }

    models.modelCreateToken(token, result)
      .then(() => {
        const message: string = 'Token creado exitosamente'
        helperResponse(res, { token }, 201, message)
      })
      .catch((err: any) => {
        const r: any = req
        r.error = createHttpError(500, err.message)
        return next()
      })
  })
}
const getCard = (_req: Req, _res: Res): null => {
  return null
}

export {
  createToken,
  getCard
}
