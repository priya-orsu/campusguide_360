const mysql = require('mysql2');
require('dotenv').config();

function testDB() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'campus_guide_360',
    port: process.env.DB_PORT || 3306
  });

  connection.connect((error) => {
    if (error) {
      console.error('❌ Database connection failed:');
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      
      // Common error solutions
      if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.log('\n💡 Solution: Check your DB_USER and DB_PASSWORD in .env file');
      } else if (error.code === 'ER_BAD_DB_ERROR') {
        console.log('\n💡 Solution: Database does not exist. Create it first.');
      } else if (error.code === 'ECONNREFUSED') {
        console.log('\n💡 Solution: MySQL server is not running or wrong port');
      }
      
      return false;
    }
    
    console.log('✅ Connected to MySQL database');
    
    // Test a simple query
    connection.query('SELECT NOW() as created_at', (error, results) => {
      if (error) {
        console.error('❌ Query failed:', error.message);
        return false;
      }
      
      console.log('✅ Database time:', results[0].current_time);
      connection.end();
      return true;
    });
  });
}

testDB();