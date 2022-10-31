import serverless from 'serverless-http'
import express from 'express'
import IndexRouter from './routes/index'
import { error404, handlerErrors } from './middleware/errors'

const app = express()

app.use(express.json())
app.use(IndexRouter)
app.use(error404)
app.use(handlerErrors)

const handler = serverless(app)

export { handler, app }
