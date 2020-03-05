import express from 'express'

// Create express instnace
const app = express()
const router = express.Router()

// Require API routes
import areas from './routes/areas'
import hotels from './routes/hotels'
import prices from './routes/prices'

// Import API Routes
router.get('/areas', areas.areas)
router.get('/area', areas.area)
router.get('/hotels', hotels.hotels)
router.get('/hotels/:id', hotels.hotelsId)
router.get('/prices', prices.prices)

app.use(router)

// Export the server middleware
export default {
  path: '/api',
  handler: app
}
