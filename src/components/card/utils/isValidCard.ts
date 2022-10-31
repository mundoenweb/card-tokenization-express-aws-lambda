// parsea la tarjea con el algoritmo de LUHN
export const isValidCard = (num: string): boolean => {
  if (num == null || !Number.isInteger(parseInt(num, 0))) return false
  if (num.length === 0 || num.length === 14 || num.length === 15) return false
  if (num.length < 13 || num.length > 16) return false

  try {
    const sumTable: number[][] = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
    ]

    let sum: number = 0; let flip: number = 0
    for (let i: number = num.length - 1; i >= 0; i--, flip++) {
      sum += sumTable[flip & 0x1][parseInt(num.charAt(i))]
    }

    return (sum % 10) === 0
  } catch (e) {
    return false
  }
}
