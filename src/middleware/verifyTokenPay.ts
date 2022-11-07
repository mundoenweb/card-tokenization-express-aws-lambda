import createError from 'http-errors'
import {
  NextFunction as Next,
  Request as Req,
  Response as Res
} from 'express'

export const verifyTokenPay = (req: Req, _res: Res, next: Next): void => {
  const authorizationHeader: string | undefined = req.headers.authorization
  const error: string = 'Acceso no autorizado'
  const expToken: RegExp = /^[A-Za-z0-9]+$/

  if (authorizationHeader === undefined) {
    req.body.error = createError.Unauthorized(error)
    return next('route')
  }

  const token: string = authorizationHeader.split(' ')[1]

  if (token.length !== 16 || !expToken.test(token)) {
    req.body.error = createError.Unauthorized(error)
    return next('route')
  }

  req.body.token = token
  next()
}

// req.body.error = createHttpError(401, 'token invalido')
// return next('route')
