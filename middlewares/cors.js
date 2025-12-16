import cors from 'cors'

// Middleware CORS: permite solicitudes desde orígenes autorizados para prevenir llamadas no deseadas
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://localhost:5173',
  'http://localhost:8081',
  'https://back-pro3.onrender.com',
  'https://front-pro-3-mp4vo0n6n-ch1mples-projects-2f2961be.vercel.app'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  // Valida el origen de la petición
  origin: (origin, callback) => {
    // Origen permitido
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
})
