import {
  NextFunction as Next,
  Request as Req,
  Response as Res
} from 'express'
import createHttpError from 'http-errors'

export const verifyTokenPay = (req: Req, _res: Res, next: Next): void => {
  const r: any = req
  const authorizationHeader: string | undefined = req.headers.authorization

  if (authorizationHeader === undefined) {
    r.error = createHttpError(401)
    return next()
  }

  const tkn: string = authorizationHeader.split(' ')[1]
  const splitToken: string[] = tkn.split('_')
  const token = splitToken[2]

  if (splitToken[0] !== 'pk' || splitToken[1] !== 'test') {
    r.error = createHttpError(401, 'token invalido')
    return next()
  }

  if (token.length < 16 || token.length > 16) {
    r.error = createHttpError(401, 'token invalido')
    return next()
  }

  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (const chart of token) {
    if (!characters.includes(chart)) {
      r.error = createHttpError(401, 'token invalido')
      return next()
    }
  }

  next()
}
