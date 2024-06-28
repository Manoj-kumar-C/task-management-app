const express = require('express');
const router = express.Router();
const { getTasks, getTasksByTitle, createTask, updateTask, deleteTask } = require('../controllers/taskController.js');

router.get('/tasks', getTasks);  // Get all tasks
router.get('/tasks/search/:title', getTasksByTitle);  // Search tasks by title
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
