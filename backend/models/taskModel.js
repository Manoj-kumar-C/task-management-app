// models/taskModel.js - DB Configs
const mysql = require('mysql2');
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

module.exports = pool.promise(); // Export the pool for promise-based queries
