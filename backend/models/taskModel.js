const mysql = require('mysql2/promise');
const { dbConfig } = require('../config.js');

// Create a connection pool
const pool = mysql.createPool(dbConfig);

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id', connection.threadId);
    connection.release();
});

module.exports = pool;
