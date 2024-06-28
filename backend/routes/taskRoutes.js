const express = require('express');
const router = express.Router();
const { getTasks, getTasksByTitle, createTask, updateTask, deleteTask } = require('../controllers/taskController.js');

router.get('/tasks', getTasks);
router.get('/tasks/search', getTasksByTitle);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
