import { MongoClient } from 'mongodb'
import mongoDB from './config'

const uri: string = `${mongoDB.host}${mongoDB.user}:${mongoDB.password}${mongoDB.cluster}?retryWrites=true&w=majority`

export const client = new MongoClient(uri)

// client.connect(err => {
//   const collection = client.db('test').collection('devices')
//   // perform actions on the collection object
//   client.close()
// })
