import express from 'express'
import * as Path from 'node:path'

import usersRoutes from './routes/user'
import tripsRoutes from './routes/trip'
import attractionsRoutes from './routes/attraction'

const server = express()

server.use(express.json())

server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/trips', tripsRoutes)
server.use('/api/v1/attractions', attractionsRoutes)


if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server

