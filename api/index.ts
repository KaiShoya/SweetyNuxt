import express from 'express'

// Create express instnace
const app = express()

// Require API routes

import hotels from './routes/hotels'

// Import API Routes
app.use(hotels)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
