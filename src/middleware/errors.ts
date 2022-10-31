import {
  NextFunction,
  Response as Res
} from 'express'
import createHttpError from 'http-errors'

export const error404 = (
  req: any,
  _res: Res,
  next: NextFunction
): void => {
  if (req.error !== undefined) return next()

  const message = {
    path: req.path,
    method: req.method,
    msg: 'ruta o metodo invalido'
  }
  req.error = createHttpError(404, message)
  next('route')
}

export const handlerErrors = (
  req: any,
  res: Res
): void => {
  res.status(req.error.status)
  res.json(req.error)
}
