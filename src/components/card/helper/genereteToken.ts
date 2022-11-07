export const genereteToken = (length: number = 16): string | false => {
  if (typeof length !== 'number') return false
  if (length < 16 || length > 16) return false

  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength: number = characters.length
  let token: string = ''

  for (let i: number = 0; i < length; i++) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return token
}
