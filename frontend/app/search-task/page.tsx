"use client"
import { useState } from 'react';
import axios from 'axios';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const SearchTask = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3307/api/tasks/tasks?title=${searchTerm}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error searching tasks:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search Tasks</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
      <ul className="mt-4">
        {tasks.map((task) => (
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

export default SearchTask;
