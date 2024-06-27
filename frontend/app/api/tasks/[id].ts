import { NextApiRequest, NextApiResponse } from 'next';
import { tasks } from '../../../../backend/controllers/taskController.js';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { status } = req.body;
    const updatedTask = await tasks.updateTask(id as string, status);
    res.status(200).json(updatedTask);
  } else if (req.method === 'DELETE') {
    await tasks.deleteTask(id as string);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
};
