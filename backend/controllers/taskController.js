const connection = require('../models/taskModel.js');
// get tasks api
exports.getTasks = (req, res) => {
    connection.query('SELECT * FROM tasks', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
};

// creating the task

exports.createTask = (req, res) => {
    const { title, description, status } = req.body;
    if (!title || !status) {
        return res.status(400).json({ message: 'Title and status are required' });
    }
    connection.query('INSERT INTO tasks SET ?', { title, description, status }, (error, results) => {
        if (error) throw error;
        res.status(201).json({ id: results.insertId, title, description, status });
    });
};

// updating the api 

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    connection.query('UPDATE tasks SET ? WHERE id = ?', [{ title, description, status }, id], (error) => {
        if (error) throw error;
        res.status(200).json({ message: 'Task updated' });
    });
};

// deleting the data in the DB
exports.deleteTask = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM tasks WHERE id = ?', [id], (error) => {
        if (error) throw error;
        res.status(200).json({ message: 'Task deleted' });
    });
};
