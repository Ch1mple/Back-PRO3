import express, { json } from 'express'
import { createBackpackRouter } from './routes/backpack.js'
import { corsMiddleware } from './middlewares/cors.js'
//import 'dotenv/config'

// Middleware para loguear peticiones
const requestLogger = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - IP: ${ip}`)
  next()
}

// Middleware para loguear conexiones rechazadas
const rejectionLogger = (err, req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress
  console.error(`[${new Date().toISOString()}] ❌ Conexión rechazada - IP: ${ip} - Error: ${err.message}`)
  res.status(err.status || 500).json({ error: err.message })
}

export const createApp = ({ backpackModel }) => {
  const app = express()
  app.use(json())
  app.use(requestLogger)
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/backpack', createBackpackRouter({ backpackModel }))

  // Middleware de error al final
  app.use(rejectionLogger)

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
