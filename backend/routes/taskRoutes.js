// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController.js');

// GET all tasks
router.get('/tasks', getTasks);

// GET tasks by title (search)
router.get('/tasks/search', getTasks); // You can modify the handler in the controller

// POST create a new task
router.post('/tasks', createTask);

// PUT update a task
router.put('/tasks/:id', updateTask);

// DELETE a task
router.delete('/tasks/:id', deleteTask);

module.exports = router;
