import { Collection, Db, WithId } from 'mongodb'
import { client } from '../../../config/connection'

export const saveCardModel = async (token: string, cardToken: string): Promise<void> => {
  try {
    await client.connect()
    const db: Db = client.db('cards')
    const cards: Collection = db.collection('cards')
    await cards.insertOne({ token, cardToken })
  } finally {
    await client.close()
  }
}

export const getCardModel = async (token: string): Promise<any | null> => {
  try {
    await client.connect()
    const db: Db = client.db('cards')
    const cards: Collection = db.collection('cards')
    const data: WithId<any> = await cards.findOne({ token })
    return data
  } finally {
    await client.close()
  }
}
export const deleteCard = async (token: string): Promise<void> => {
  try {
    await client.connect()
    const db: Db = client.db('cards')
    const cards: Collection = db.collection('cards')
    await cards.deleteOne({ token })
  } finally {
    await client.close()
  }
}
