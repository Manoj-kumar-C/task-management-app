"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('All');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3307/api/tasks/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = filter === 'All' ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Filter by status</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="mb-4 p-4 border border-gray-300 rounded">
            <h3 className="text-xl font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
