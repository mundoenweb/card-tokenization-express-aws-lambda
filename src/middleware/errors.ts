import {
  NextFunction as Next,
  Response as Res,
  Request as Req
} from 'express'
import createError from 'http-errors'

export const error404 = (req: Req, _res: Res, next: Next): void => {
  if (req.body.error !== undefined) return next()

  const message = {
    path: req.path,
    method: req.method,
    msg: 'ruta o metodo invalido'
  }

  req.body.error = createError(404, message)
  next()
}

export const handlerErrors = (req: any, res: Res): void => {
  const error = req.body.error
  const err: any = typeof error.message === 'string' ? error : error.message
  res.status(error.status)
  res.json(err)
}
