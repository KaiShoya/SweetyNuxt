import express from 'express'

// Create express instnace
const app = express()

// Require API routes

import areas from './routes/areas'
import hotels from './routes/hotels'
import prices from './routes/prices'

// Import API Routes
app.use(areas)
app.use(hotels)
app.use(prices)

// Export the server middleware
export default {
  path: '/api',
  handler: app
}
