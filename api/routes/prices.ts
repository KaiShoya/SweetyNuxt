import { Router } from 'express'

const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres'
  }
)

const router = Router()

/* GET prices listing. */
router.get('/prices', async (req, res) => {
  const where = []
  const data = []

  where.push('hotel_id IN (?)')
  data.push(JSON.parse(req.query.hotels as string))

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
      '((utilization_time NOT IN (\'Free\', \'Lodging\') AND (CAST(utilization_time AS INTEGER) >= CAST(? AS INTEGER))) ' +
        'OR (utilization_time IN (\'Free\', \'Lodging\') AND (time_zone_end - INTERVAL \'' + Number(utilizationTime) + ' MINUTE\') >= ?))'
    )
    data.push(utilizationTime)
    data.push(utilizationTime)
    data.push(hourTime)
  }

  const rows = await sequelize.query(
    `SELECT * FROM price_lists WHERE ${where.join(' AND ')} ORDER BY id`,
    {
      replacements: data,
      type: QueryTypes.SELECT
    }
  )
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
})

export default router
