const db = require('../models/taskModel');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM tasks');
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Get tasks by title (search)
exports.getTasksByTitle = async (req, res) => {
  const { title } = req.params;  // Extract title from URL parameter
  try {
    const [results] = await db.query('SELECT * FROM tasks WHERE title LIKE ?', [`%${title}%`]);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching tasks by title:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const [results] = await db.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status]);
    res.status(201).json({ id: results.insertId });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    await db.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, id]);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Database error' });
  }
};
