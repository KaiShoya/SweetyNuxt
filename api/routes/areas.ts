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

router.get('/areas', function(req, res, next) {
  connection.query(
    'SELECT * FROM area_master',
    function(err, rows, fields) {
      if (err) throw err
      res.json(rows)
    }
  )
})

router.get('/area', function(req, res, next) {
  const areaId = Number(req.query.id) || 1
  connection.query(
    'SELECT * FROM detail_area_master WHERE area_id = ?',
    [areaId],
    function(err, rows, fields) {
      if (err) throw err
      res.json(rows)
    }
  )
})

export default router
