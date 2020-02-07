import { Router } from 'express'
import mysql from 'mysql'
import moment from 'moment'

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT || 3306)
})

const router = Router()

/* GET hotels listing. */
router.get('/hotels', function(req, res, next) {
  const where = ['deleted = false']
  const data = []
  // クレジットカード
  if (req.query.credit != null) {
    where.push('h.credit_card = true')
  }

  // 空室情報
  const availability = JSON.parse(req.query.availability || '[]')
  if (req.query.availability != null) {
    if (availability.length == 0) {
      // 全てのチェックが外れていた場合に条件を反転させる
      where.push('a.availability not in (?)')
    } else {
      if (availability.includes(0)) {
        // 0が含まれていたら
        where.push('(a.availability IS NULL OR a.availability in (?))')
      } else {
        where.push('a.availability in (?)')
      }
    }
  } else {
    // 全て検索
    where.push('(a.availability IS NULL OR a.availability in (?))')
  }
  if (req.query.availability == null || availability.length == 0) {
    data.push([0, 1, 2])
  } else {
    data.push(availability)
  }

  const areaId = Number(req.query.area) || 0
  if (areaId != 0) {
    where.push('ha.area_id = ?')
    data.push(areaId)
  }

  const detailAreaId = Number(req.query.detail_area) || 0
  if (detailAreaId != 0) {
    where.push('ha.detail_area_id = ?')
    data.push(detailAreaId)
  }

  const sql =
    'SELECT h.*, IFNULL(a.availability, 0) AS availability, a.room_count, a.updated_at AS updated_at_availability' +
    ' FROM hotels h' +
    ' LEFT JOIN availability a ON h.id = a.hotel_id' +
    ' LEFT JOIN (SELECT detail_area_id,area_id,hotel_id FROM hotel_areas ha LEFT JOIN detail_area_master dam ON ha.detail_area_id = dam.id) ha ON h.id = ha.hotel_id' +
    ` WHERE ${where.join(' AND ')}` +
    ' ORDER BY id'

  moment.locale('ja')
  connection.query(sql, data, function(err, rows, fields) {
    if (err) throw err
    res.json(
      rows.map(function(element: any) {
        return {
          id: element.id,
          name: element.name,
          address: element.address,
          phone: element.phone,
          mapcode: element.mapcode,
          lat: element.lat,
          lon: element.lon,
          credit_card: element.credit_card,
          created_at: element.created_at,
          updated_at: element.updated_at,
          availability: element.availability,
          room_count: element.room_count,
          updated_at_availability:
            element.updated_at_availability == null
              ? null
              : moment(new Date(element.updated_at_availability)).fromNow()
        }
      })
    )
  })
})

/* GET hotel by ID. */
router.get('/hotels/:id', function(req, res, next) {
  const id = parseInt(req.params.id)
  connection.query(
    'SELECT * FROM hotels WHERE id = ? ORDER BY id',
    [id],
    function(err, rows, fields) {
      if (err) throw err
      res.json(rows)
    }
  )
})

export default router
