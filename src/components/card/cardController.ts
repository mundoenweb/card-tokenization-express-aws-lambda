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
import { newCard } from './types/interface'

const SECRET_PASSWORD = 'secretPass.3467'

const createToken = (req: Req, res: Res, next: Next): void => {
  const card: newCard | string = validateData(req.body)

  if (typeof card === 'string') {
    req.body.error = createHttpError(400, card)
    next()
    return
  }

  const token: string = genereteToken()
  const config = { expiresIn: 900 }

  jwt.sign({ card }, SECRET_PASSWORD, config, (err, result): void => {
    if (err !== null) {
      req.body.error = createHttpError(500, err.message)
      return next()
    }

    models.modelCreateToken(token, result)
      .then(() => {
        const message: string = 'Token creado exitosamente'
        helperResponse(res, { token }, 201, message)
      })
      .catch((err: any) => {
        req.body.error = createHttpError(500, err.message)
        next()
      })
  })
}
const getCard = (req: Req, res: Res, next: Next): void => {
  const { token } = req.body // token obtenidos desde el middleware
  const msgExpOrNotExist: string = 'La información que busca no existe o a expirado, favor vuelva a intentar con nuevos datos'

  models.modelGetCard(token)
    .then((response: any[]) => {
      if (response.length === 0) {
        throw new Error(msgExpOrNotExist)
      }

      const cardToken: string = response[0].cardToken
      jwt.verify(cardToken, SECRET_PASSWORD, (err: any, result: any): void => {
        if (err !== null) {
          if (err.message === 'jwt expired') {
            models.deleteCard(token).then(() => { }).catch(() => { })
            throw new Error(msgExpOrNotExist)
          }
          throw new Error(err.message)
        }

        const data = { ...result.card }
        delete data.cvv
        helperResponse(res, data, 200, 'consulta exitosa')
      })
    })
    .catch(err => {
      req.body.error = createHttpError(400, err.message)
      next()
    })
}

export {
  createToken,
  getCard
}
