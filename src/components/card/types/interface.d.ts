import { Month } from './enums'

export interface newCard {
  card_number: number
  cvv: number
  expiration_month: Month
  expiration_year: string
  email: string
}
