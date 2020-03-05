import mysql from 'mysql'

export default function(): mysql.Connection {
  return mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT || 3306)
  })
}
