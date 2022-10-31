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
const getCard = (req: Req, res: Res, next: Next): void => {
  const { token } = req.body

  models.modelGetCard(token)
    .then(response => {
      const msgExpOrNotExist: string = 'La información que busca no existe o a expirado, favor vuelva a intentar con nuevos datos'
      if (response.length === 0) {
        helperResponse(res, [], 200, msgExpOrNotExist)
      }

      const cardToken: string = response[0].cardToken

      jwt.verify(cardToken, SECRET_PASSWORD, (err: any, result: any): void => {
        if (err !== null) {
          if (err.message === 'jwt expired') {
            models.deleteCard(token).then(() => {}).catch(() => { })
            throw new Error(msgExpOrNotExist)
          }
          throw new Error(err.message)
        }

        const data = { ...result.card }
        delete data.cvv
        helperResponse(res, data, 200, 'consulta exitosa')
      })

      helperResponse(res, cardToken, 200, 'consulta exitosa')
    })
    .catch(err => {
      const r: any = req
      r.error = createHttpError(400, err.message)
      next()
    })
}

export {
  createToken,
  getCard
}
