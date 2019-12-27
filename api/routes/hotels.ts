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

/* GET hotels listing. */
router.get('/hotels', function(req, res, next) {
  connection.query('SELECT * FROM hotels ORDER BY id', function(
    err,
    rows,
    fields
  ) {
    if (err) throw err
    res.json(rows)
  })
})

/* GET hotel by ID. */
router.get('/hotels/:id', function(req, res, next) {
  const id = parseInt(req.params.id)
  connection.query('SELECT * FROM hotels WHERE id = ? ORDER BY id', [id], function(
    err,
    rows,
    fields
  ) {
    if (err) throw err
    res.json(rows)
  })
})

export default router
