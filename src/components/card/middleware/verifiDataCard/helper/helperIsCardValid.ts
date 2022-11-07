// valida una tarjea de debito o credito
// con el algoritmo de LUHN

type SN = string | number

export const helperIsCardValid = (num: SN): boolean => {
  if (typeof num !== 'string' && typeof num !== 'number') return false

  const expNum: RegExp = /^[1-9-0]+$/
  const card: string = num.toString()

  if (!expNum.test(card)) return false
  if (card.length < 13 || card.length > 16) return false
  if (card.length === 14 || card.length === 15) return false

  try {
    let sum: number = 0
    let flip: number = 0
    const sumTable: number[][] = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
    ]

    for (let i: number = card.length - 1; i >= 0; i--, flip++) {
      sum += sumTable[flip & 0x1][parseInt(card.charAt(i))]
    }

    return (sum % 10) === 0
  } catch (e) {
    return false
  }
}
