import { genereteToken } from '../genereteToken'

test(' si le pasamos uno la media seria 1', () => {
  const token: string = genereteToken()
  expect(token).toHaveLength(24)
})
