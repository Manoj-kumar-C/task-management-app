// DB Configs
const mysql = require('mysql2');
const { dbConfig } = require('../config.js');

const connection = mysql.createConnection(dbConfig);

connection.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

module.exports = connection;
