import {
  NextFunction as Next,
  Response as Res,
  Request as Req
} from 'express'
import createHttpError from 'http-errors'

export const error404 = (req: Req, _res: Res, next: Next): void => {
  if (req.body.error !== undefined) return next()

  const message = {
    path: req.path,
    method: req.method,
    msg: 'ruta o metodo invalido'
  }

  req.body.error = createHttpError(404, message)
  next('route')
}

export const handlerErrors = (req: any, res: Res): void => {
  const error = req.body.error
  res.status(error.status)
  res.json(error)
}
