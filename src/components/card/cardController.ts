import {
  NextFunction as Next,
  Request as Req,
  Response as Res
} from 'express'
// import createHttpError from 'http-errors'
import { helperResponse } from '../../utils/helperResponse'
import { newCard } from './types/interface'
import { createTokenAndSaveCard, getCardService } from './service/cardService'

export const createToken = async (req: Req, res: Res, next: Next): Promise<void> => {
  try {
    const card: newCard = req.body
    const token = await createTokenAndSaveCard(card)
    helperResponse(res, token, 201, 'Token creado exitosamente')
  } catch (error: any) {
    req.body.error = error
    next('route')
  }
}
export const getCard = async (req: Req, res: Res, next: Next): Promise<void> => {
  try {
    const { token } = req.body // token obtenidos desde el middleware
    const card = await getCardService(token)
    helperResponse(res, card, 200, 'consulta exitosa')
  } catch (error: any) {
    req.body.error = error
    next('route')
  }
}
