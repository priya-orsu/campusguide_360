// config/database.js

const mysql = require('mysql2/promise');

require('dotenv').config();

const pool = mysql.createPool({

  host: process.env.DB_HOST || 'localhost',

  user: process.env.DB_USER || 'root',

  password: process.env.DB_PASSWORD || '',

  database: process.env.DB_NAME || 'campus_guide_360',

  port: process.env.DB_PORT || 3306,

  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0,

  timezone: '+00:00'

});

// Test Database Connection

const testConnection = async () => {

  try {

    const connection = await pool.getConnection();

    console.log('✅ Database connected successfully');

    connection.release();

    return true;

  } catch (error) {

    console.error('❌ Database connection failed');

    console.error(error.message);

    return false;
  }
};

// Execute Query Function

const execute = async (query, params = []) => {

  try {

    const [rows] = await pool.execute(query, params);

    return rows;

  } catch (error) {

    console.error('❌ Database query error');

    console.error('Query:', query);

    console.error('Params:', params);

    console.error('Error:', error.message);

    throw error;
  }
};

module.exports = {
  pool,
  testConnection,
  execute
};