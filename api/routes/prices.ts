import { Request } from 'express'
import context from '../connection'

const router = function() {}

/* GET prices listing. */
router.prices = function(req: Request, res: any, next: any) {
  const connection = context()
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
  const hourTime = `${startHour}:${startTime}:00`
  if (
    !(
      (startHour === '0' || startHour === '00') &&
      (startTime === '0' || startTime === '00')
    )
  ) {
    // 0:00じゃない場合
    where.push('time_zone_start <= ?')
    data.push(hourTime)
    where.push(
      '((from_checkin = false AND time_zone_end >= ?) OR (from_checkin = true AND time_zone_end >= ?))'
    )
    data.push(hourTime)
    data.push(hourTime)
  }

  // 利用時間
  const utilizationTime = req.query.utilizationTime
  if (utilizationTime == null || utilizationTime == '') {
    // 何もしない
  } else if (utilizationTime == 'Free' || utilizationTime == 'Lodging') {
    where.push('utilization_time = ?')
    data.push(utilizationTime)
  } else {
    where.push(
      '(CAST(utilization_time AS SIGNED) >= CAST(? AS SIGNED) ' +
        'OR (utilization_time IN ("Free", "Lodging") AND (time_zone_end - INTERVAL ? MINUTE) >= ?))'
    )
    data.push(utilizationTime)
    data.push(utilizationTime)
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
  connection.end()
}

export default router
