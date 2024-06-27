// backend/createTables.js

require('dotenv').config(); // Load environment variables from .env file
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT || 3306, // Default port 3306 for MySQL
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id', connection.threadId);
});

// SQL query to create tables
const createTablesQuery = `
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('To Do', 'In Progress', 'Done') DEFAULT 'To Do'
)`;

// Execute the create table query
connection.query(createTablesQuery, (err, results) => {
  if (err) {
    console.error('Error creating tables:', err);
  } else {
    console.log('Tables created successfully:', results);
  }
  
  // Close the connection
  connection.end();
});
