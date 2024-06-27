// backend/insertAndSelect.js

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

// Function to insert data into the tasks table
const insertData = () => {
  const task = {
    title: 'Sample Task',
    description: 'This is a sample task description.',
    status: 'To Do',
  };

  const insertQuery = 'INSERT INTO tasks SET ?';

  connection.query(insertQuery, task, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      console.log('Data inserted successfully:', results);
      selectAllData(); // After insertion, select all data
    }
  });
};

// Function to select all data from the tasks table
const selectAllData = () => {
  const selectQuery = 'SELECT * FROM tasks';

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error selecting data:', err);
    } else {
      console.log('Selected data from tasks table:', results);
    }

    // Close the connection after select query
    connection.end();
  });
};

// Call the insertData function to start the process
insertData();
