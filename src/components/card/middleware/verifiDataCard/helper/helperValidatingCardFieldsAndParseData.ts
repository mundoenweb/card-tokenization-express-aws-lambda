import { EmailOk, Month } from '../../../types/enums'
import { helperIsCardValid } from './helperIsCardValid'

export const isString = (str: string): boolean => {
  return typeof str === 'string'
}
export const isInteger = (num: any): boolean => {
  const expNum: RegExp = /^[1-9-0]+$/
  return expNum.test(num)
}
export const isEmail = (email: any): boolean => {
  const expEmail = /\w+@\w+\.+[a-z]/
  const emailPlatfrom: any = email.split('@')[1]
  if (!expEmail.test(email) || !Object.values(EmailOk).includes(emailPlatfrom)) {
    return false
  }
  return true
}
export const isMonth = (param: any): boolean => {
  return Object.values(Month).includes(param)
}
export const parseEmail = (email: string): string => {
  if (!isString(email) || !isEmail(email)) {
    throw new Error('Email incorrect')
  }
  return email
}

export const parseCVV = (cvv: any): number => {
  const len = cvv.toString().length
  if (!isInteger(cvv) || (len !== 3 && len !== 4)) {
    throw new Error('CVV incorrect')
  }
  return Number(cvv)
}
export const parseExpMonth = (month: any): Month => {
  if (isMonth(month)) return month
  throw new Error('Month incorrect')
}
export const parseExpYear = (param: any): string => {
  const yearCurrent: number = new Date().getFullYear()
  const yearOld: boolean = parseInt(param, 10) < yearCurrent
  const yearMax: boolean = parseInt(param, 10) > yearCurrent + 5
  if (!isInteger(param) || yearOld || yearMax) {
    throw new Error('Year incorrect')
  }
  return param
}
export const parseCard = (card: any): number => {
  if (!helperIsCardValid(card)) {
    throw new Error('Card number is incorrect')
  }
  return Number(card)
}
