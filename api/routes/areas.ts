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

router.get('/areas', async (req, res) => {
  const rows = await sequelize.query(
    'SELECT * FROM area_master',
    {
      type: QueryTypes.SELECT
    }
  )
  res.json(rows)
})

router.get('/area', async (req, res) => {
  const areaId = Number(req.query.id) || 1
  const rows = await sequelize.query(
    'SELECT * FROM detail_area_master WHERE area_id = ?',
    {
      replacements: [areaId],
      type: QueryTypes.SELECT
    }
  )
  res.json(rows)
})

export default router
