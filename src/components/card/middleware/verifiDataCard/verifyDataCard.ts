import {
  NextFunction as Next,
  Request as Req,
  Response as Res
} from 'express'
import createError from 'http-errors'
import { newCard } from '../../types/interface'
import * as dataParse from './helper/helperValidatingCardFieldsAndParseData'

export const verifyDataCard = (req: Req, _res: Res, next: Next): void => {
  const data: any = req.body

  console.log(data)

  try {
    if (Object.keys(data).length === 0 || data === undefined) {
      throw new Error('Debe enviar todos los datos')
    }

    const card: newCard = {
      email: dataParse.parseEmail(data.email),
      cvv: dataParse.parseCVV(data.cvv),
      expiration_month: dataParse.parseExpMonth(data.expiration_month),
      expiration_year: dataParse.parseExpYear(data.expiration_year),
      card_number: dataParse.parseCard(data.card_number)
    }

    req.body = card
    next()
  } catch (error: any) {
    const message: string = error.message
    req.body.error = createError(400, { message })
    next('route')
  }
}
