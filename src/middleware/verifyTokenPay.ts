import {
  NextFunction as Next,
  Request as Req,
  Response as Res
} from 'express'
import createHttpError from 'http-errors'

export const verifyTokenPay = (req: Req, _res: Res, next: Next): void => {
  const authorizationHeader: string | undefined = req.headers.authorization

  if (authorizationHeader === undefined) {
    req.body.error = createHttpError(403)
    return next('route')
  }

  const tkn: string = authorizationHeader.split(' ')[1]
  const splitToken: string[] = tkn.split('_')
  const token = splitToken[2]

  if (splitToken[0] !== 'pk' || splitToken[1] !== 'test') {
    req.body.error = createHttpError(401, 'token invalido')
    return next('route')
  }

  if (token.length !== 16) {
    req.body.error = createHttpError(401, 'token invalido')
    return next('route')
  }

  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (const chart of token) {
    if (!characters.includes(chart)) {
      req.body.error = createHttpError(401, 'token invalido')
      return next('route')
    }
  }

  req.body.token = tkn
  next()
}
