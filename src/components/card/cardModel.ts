import { client } from '../../config/connection'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function modelCreateToken (token: string, cardToken: string | undefined) {
  try {
    await client.connect()
    const db = client.db('cards')
    const cards = db.collection('cards')
    const data = await cards.insertOne({ token, cardToken })
    return data
  } finally {
    await client.close()
  }
}

async function modelGetCard (token: string): Promise<any> {
  try {
    await client.connect()
    const db = client.db('cards')
    const cards = db.collection('cards')
    const data = await cards.findOne({ token })
    return data !== null ? [data] : []
  } finally {
    await client.close()
  }
}
async function deleteCard (token: string): Promise<any> {
  try {
    await client.connect()
    const db = client.db('cards')
    const cards = db.collection('cards')
    return await cards.deleteOne({ token })
  } finally {
    await client.close()
  }
}

export {
  modelCreateToken,
  modelGetCard,
  deleteCard
}
