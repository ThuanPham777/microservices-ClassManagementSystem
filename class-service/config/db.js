const mysql = require('mysql2/promise');
const redis = require('redis');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '34.124.157.35',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASS || 'mauFJcuf5dhRMQrjj',
  database: process.env.DB_NAME || 'classmanagement',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
