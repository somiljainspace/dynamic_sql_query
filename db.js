require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  query: async (sql, params) => {
    try {
      console.log('Executing SQL:', sql, 'Params:', params);
      const [rows] = await pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('Database query error:', error.message);
      throw new Error('Database query failed');
    }
  },
  close: async () => {
    try {
      await pool.end();
      console.log('Database connection pool closed');
    } catch (error) {
      console.error('Error closing the connection pool:', error.message);
    }
  },
};
