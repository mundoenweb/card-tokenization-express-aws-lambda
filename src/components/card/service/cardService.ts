import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import * as models from '../model/cardModel'
import config from '../../../config/config'
import { genereteToken } from '../helper/genereteToken/genereteToken'
import { newCard } from '../types/interface'

export const createTokenAndSaveCard = async (data: newCard): Promise<any> => {
  try {
    const token: any = genereteToken()
    const options = { expiresIn: 900 }
    const secret: any = config.secretPassJWT
    const cardToken = jwt.sign({ data }, secret, options)
    await models.saveCardModel(token, cardToken)
    return { token }
  } catch (error: any) {
    throw createError.InternalServerError(error.message)
  }
}

export const getCardService = async (token: string): Promise<any> => {
  try {
    const response = await models.getCardModel(token)
    if (response === null) throw createError.BadRequest()

    const secret: any = config.secretPassJWT
    const result: any = jwt.verify(response.cardToken, secret)
    const card = { ...result.data, cvv: undefined }

    return card
  } catch (err: any) {
    const message: string = 'La información que busca no existe o a expirado'
    const ISR: string = 'Internal Server Error'
    if (err.message === ISR) throw createError.InternalServerError(err)
    if (err.message === 'jwt expired') await models.deleteCard(token)
    throw createError.BadRequest({ ...err, message })
  }
}
