import { newCard } from '../../types/interface'
import { validateData } from '../validateData'

describe('validanto data de ingreso tarjeta', () => {
  test('data correcta', () => {
    const card = {
      email: 'rommer@hotmail.com',
      ccv: '123',
      expiration_month: '12',
      expiration_year: '2027',
      card_number: '4551038338995199'
    }
    const result: newCard | string = validateData(card)
    if (typeof result === 'string') return
    expect(result.card_number).toBe(4551038338995199)
  })
  test('algun dato incorrecto', () => {
    const card = {
      email: 'rommer@hotml.com',
      ccv: '123',
      expiration_month: '12',
      expiration_year: '2027',
      card_number: '4551038338995199'
    }
    const result: newCard | string = validateData(card)
    if (typeof result !== 'string') return
    expect(result).toContain('incorrect')
  })
  test('pasando undefined o cualquier dato invalido', () => {
    const result: newCard | string = validateData(undefined)
    if (typeof result !== 'string') return
    expect(result).toContain('Debe enviar todos los datos')
  })
})
