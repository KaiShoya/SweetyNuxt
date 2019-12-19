const express = require('express')

// Create express instnace
const app = express()

// Require API routes
const hotels = require('./routes/hotels')

// Import API Routes
app.use(hotels)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
