import { isValidCard } from '../isValidCard'

describe('test tarjeta', () => {
  test('tarjeta correcta', () => {
    const card: string = '4551038338995199'
    const result: boolean = isValidCard(card)
    expect(result).toBe(true)
  })
  test('pasando una tarjeta incorrecta', () => {
    const card: string = '4551038338995196'
    const result: boolean = isValidCard(card)
    expect(result).toBe(false)
  })
  test('pasando un string vacio', () => {
    const card: string = ''
    const result: boolean = isValidCard(card)
    expect(result).toBe(false)
  })
})
