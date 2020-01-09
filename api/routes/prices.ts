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
  const where = []
  const data = []

  where.push('hotel_id IN (?)')
  data.push(JSON.parse(req.query.hotels))

  // 曜日
  if (req.query.dow != null && Number(req.query.dow) != 0) {
    where.push('day_of_week = ?')
    data.push(req.query.dow)
  }

  // 利用開始時間
  const startHour = req.query.startHour || '0'
  const startTime = req.query.startTime || '00'
  if (
    (startHour != '0' || startHour != '00') &&
    (startTime != '0' || startTime != '00')
  ) {
    const hourTime = `${startHour}:${startTime}:00`
    // 0:00じゃない場合
    where.push('time_zone_start <= ?')
    data.push(hourTime)
    where.push(
      '((from_checkin = false AND time_zone_end >= ?) OR (from_checkin = true AND time_zone_end >= ?))'
    )
    data.push(hourTime)
    data.push(hourTime)
  }

  connection.query(
    `SELECT * FROM price_lists WHERE ${where.join(' AND ')} ORDER BY id`,
    data,
    function(err, rows, fields) {
      if (err) throw err
      res.json(
        rows.map(function(element: any) {
          return {
            hotel_id: element.hotel_id,
            day_of_week: element.day_of_week,
            utilization_time: element.utilization_time,
            time_zone_start: element.time_zone_start,
            time_zone_end: element.time_zone_end,
            min_price: element.min_price,
            max_price: element.max_price
          }
        })
      )
    }
  )
})

export default router
