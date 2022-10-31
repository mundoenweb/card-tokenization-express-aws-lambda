import { newCard } from '../types/interface'
import { EmailOk, Month } from '../types/enums'
import { isValidCard } from './isValidCard'

const isString = (str: string): boolean => {
  return typeof str === 'string'
}
const isInteger = (num: any): boolean => {
  return Number.isInteger(parseInt(num))
}
const isEmail = (email: any): boolean => {
  const expEmail = /\w+@\w+\.+[a-z]/
  const emailPlatfrom: any = email.split('@')[1]
  if (!expEmail.test(email) || !Object.values(EmailOk).includes(emailPlatfrom)) {
    return false
  }
  return true
}
const isMonth = (param: any): boolean => {
  return Object.values(Month).includes(param)
}
const parseEmail = (email: string): string => {
  if (!isString(email) || !isEmail(email)) {
    throw new Error('Email Incorrect')
  }
  return email
}

const parseCCV = (ccv: any): number => {
  const len = ccv.toString().length
  if (!isInteger(ccv) || (len !== 3 && len !== 4)) {
    throw new Error('CCV Incorrect')
  }
  return Number(ccv)
}
const parseExpMonth = (month: any): Month => {
  if (isMonth(month)) return month
  throw new Error('Month Incorrect')
}
const parseExpYear = (param: any): string => {
  const yearCurrent: number = new Date().getFullYear()
  const yearOld: boolean = parseInt(param, 10) < yearCurrent
  const yearMax: boolean = parseInt(param, 10) > yearCurrent + 5
  if (!isInteger(param) || yearOld || yearMax) {
    throw new Error('Year Incorrect')
  }
  return param
}
const parseCard = (card: any): number => {
  if (!isValidCard(card)) {
    throw new Error('Card incorrect')
  }
  return Number(card)
}

const validateData = (data: any): newCard | string => {
  try {
    const card: newCard = {
      email: parseEmail(data.email),
      cvv: parseCCV(data.ccv),
      expiration_month: parseExpMonth(data.expiration_month),
      expiration_year: parseExpYear(data.expiration_year),
      card_number: parseCard(data.card_number)
    }

    return card
  } catch (err: any) {
    return err.message
  }
}

export { validateData }
