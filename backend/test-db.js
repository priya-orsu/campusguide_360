const mysql = require('mysql2');
require('dotenv').config();

function testDB() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  });

  connection.connect((error) => {
    if (error) {
      console.error('❌ Database connection failed');
      console.error('Message:', error.message);
      console.error('Code:', error.code);

      if (error.code === 'ER_ACCESS_DENIED_ERROR') {
        console.log('💡 Check DB_USER and DB_PASSWORD');
      }

      if (error.code === 'ER_BAD_DB_ERROR') {
        console.log('💡 Database does not exist');
      }

      if (error.code === 'ECONNREFUSED') {
        console.log('💡 MySQL server not running or wrong host');
      }

      if (error.code === 'ENOTFOUND') {
        console.log('💡 Invalid DB_HOST');
      }

      return;
    }

    console.log('✅ Connected to MySQL database');

    connection.query(
      'SELECT NOW() AS current_time',
      (error, results) => {

        if (error) {
          console.log('❌ Query failed:', error.message);
          return;
        }

        console.log(
          '✅ Database time:',
          results[0].current_time
        );

        connection.end();
      }
    );
  });
}

testDB();