import { Router } from 'express'
import mysql from 'mysql'
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT || 3306)
})

const router = Router()

/* GET prices listing. */
router.get('/prices', function(req, res, next) {
  connection.query('SELECT * FROM price_lists ORDER BY id', function(
    err,
    rows,
    fields
  ) {
    if (err) throw err

    res.json(rows.map(function(element: any) {
      return {
        hotel_id: element.hotel_id,
        day_of_week: element.day_of_week,
        availability: null,
        updated_at_availability: null,
        utilization_time: element.utilization_time,
        time_zone_start: element.time_zone_start,
        time_zone_end: element.time_zone_end,
        min_price: element.min_price,
        max_price: element.max_price
      }
    }))
  })
})

export default router
