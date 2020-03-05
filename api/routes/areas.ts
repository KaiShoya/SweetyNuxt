import { Request } from 'express'
import context from '../connection'

const router = function() {}

router.areas = function(req: Request, res: any, next: any) {
  const connection = context()
  connection.query(
    'SELECT * FROM area_master',
    function(err, rows, fields) {
      if (err) throw err
      res.json(rows)
    }
  )
  connection.end()
}

router.area = function(req: Request, res: any, next: any) {
  const connection = context()
  const areaId = Number(req.query.id) || 1
  connection.query(
    'SELECT * FROM detail_area_master WHERE area_id = ?',
    [areaId],
    function(err, rows, fields) {
      if (err) throw err
      res.json(rows)
    }
  )
  connection.end()
}

export default router
