import { NextApiRequest, NextApiResponse } from 'next';
import { tasks } from '../../../../backend/controllers/taskController.js';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const data = await tasks.getAllTasks();
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const { title, description, status } = req.body;
    const newTask = await tasks.createTask({ title, description, status });
    res.status(201).json(newTask);
  } else {
    res.status(405).end();
  }
};
