// backend/insertAndSelect.js

require('dotenv').config(); // Load environment variables from .env file
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'u95.h.filess.io',
    user: 'manoj_coasttide',
    password: 'e843734c94da8fffe104124305233ed6b4f3e59a',
    database: 'manoj_coasttide',
    port: 3307,
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
//insertData();
selectAllData();