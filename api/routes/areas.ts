import { Request } from 'express'
import mysql from 'mysql'

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT || 3306)
})

const router = function() {}

router.areas = function(req: Request, res: any, next: any) {
  connection.query(
    'SELECT * FROM area_master',
    function(err, rows, fields) {
      if (err) throw err
      res.json(rows)
    }
  )
}

router.area = function(req: Request, res: any, next: any) {
  const areaId = Number(req.query.id) || 1
  connection.query(
    'SELECT * FROM detail_area_master WHERE area_id = ?',
    [areaId],
    function(err, rows, fields) {
      if (err) throw err
      res.json(rows)
    }
  )
}

export default router
