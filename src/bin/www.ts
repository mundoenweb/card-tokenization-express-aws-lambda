import { app } from '../index'
import http from 'http'

const server = http.createServer(app)

type Port = string | number
const normalizePort = (val: any): Port => {
  const port = parseInt(val, 10)

  if (isNaN(port)) return val
  if (port >= 0) return port
  return '3467'
}

const port: Port = normalizePort('3467')
app.set('port', port)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function onError (error: any): void {
  if (error.syscall !== 'listen') throw error

  const bind = (typeof port === 'string')
    ? `Pipe ${port}`
    : `Port ${port}`

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      return process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      return process.exit(1)
    default:
      throw error
  }
}

function onListening (): void {
  const addr = server.address()
  if (addr === null) {
    return
  }
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : `port ${addr.port}`
  console.log('Runnig server:', bind)
}
