export default {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  // "database": process.env.DATABASE_NAME
  database: 'sweety',
  synchronize: false,
  logging: false,
  entities: ['typeorm/entities/**/*.ts'],
  migrations: ['typeorm/migrations/**/*.ts'],
  subscribers: ['typeorm/subscribers/**/*.ts']
}
