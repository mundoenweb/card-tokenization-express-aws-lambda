export const cardValid = {
  email: 'rommer@hotmail.com',
  cvv: '1234',
  expiration_month: '12',
  expiration_year: '2027',
  card_number: '4551038338995199'
}
export const responseOK = {
  card_number: 4551038338995199,
  cvv: 1234,
  email: 'rommer@hotmail.com',
  expiration_month: '12',
  expiration_year: '2027'
}
export const cardEmailInvalid = {
  email: 'rommer@tuemprende.com',
  cvv: '1234',
  expiration_month: '12',
  expiration_year: '2027',
  card_number: '4551038338995199'
}
export const cardCVVInvalid = {
  email: 'rommer@hotmail.com',
  cvv: '12345',
  expiration_month: '12',
  expiration_year: '2027',
  card_number: '4551038338995199'
}
export const cardMonthInvalid = {
  email: 'rommer@hotmail.com',
  cvv: '1234',
  expiration_month: 'diciembre',
  expiration_year: '2027',
  card_number: '4551038338995199'
}
export const cardYearInvalid = {
  email: 'rommer@hotmail.com',
  cvv: '1234',
  expiration_month: '12',
  expiration_year: '2030',
  card_number: '4551038338995199'
}
export const cardNumberInvalid = {
  email: 'rommer@hotmail.com',
  cvv: '1234',
  expiration_month: '12',
  expiration_year: '2027',
  card_number: '4551038338995191'
}

export const DBCard = {
  email: 'rommer@hotmail.com',
  expiration_month: '12',
  expiration_year: '2027',
  card_number: 4551038338995199
}

export const expToken = /^[A-Za-z0-9]+$/
export const tokenCorrect = 'ClDTOYVIfhdz9mOK'
export const tokenIncorrect = 'lWIazf3MSI0mG.'
export const expiredToken = 'lWIazf3MSI0mGTmU'
export const msgErrorToken = 'La información que busca no existe o a expirado'
