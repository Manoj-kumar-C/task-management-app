// controllers/taskController.js
const db = require('../models/taskModel');

// Get all tasks
exports.getTasks = (req, res) => {
  const query = 'SELECT * FROM tasks';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json(results);
    }
  });
};

// Create a new task
exports.createTask = (req, res) => {
  const { title, description, status } = req.body;
  const query = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)';
  db.query(query, [title, description, status], (error, results) => {
    if (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(201).json({ id: results.insertId });
    }
  });
};

// Update a task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
  db.query(query, [title, description, status, id], (error, results) => {
    if (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json({ message: 'Task updated successfully' });
    }
  });
};

// Delete a task
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(200).json({ message: 'Task deleted successfully' });
    }
  });
};
