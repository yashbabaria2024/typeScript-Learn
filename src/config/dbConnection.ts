import mysql from 'mysql2';
import logger from '../utils/pino';
import { config } from 'dotenv';
import Iconfig from '../interface/Iconfige';

config()
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    dateStrings: true
} as Iconfig).promise()

try {
    conn.connect()
    logger.info("DB Connected")

} catch (error) {
    logger.error(error)
}



export default conn;