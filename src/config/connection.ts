/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { MongoClient } from 'mongodb'
import config from './config'

const { mongoDB }: any = config

const uri: string = `${mongoDB.host}${mongoDB.user}:${mongoDB.password}${mongoDB.cluster}?retryWrites=true&w=majority`

export const client = new MongoClient(uri)
