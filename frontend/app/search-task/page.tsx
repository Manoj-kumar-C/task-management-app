"use client"
import { useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const SearchTask = () => {
  useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3307/api/tasks/tasks/search/${searchTerm}`);
      setTasks(response.data);
      setError('');
    } catch (error) {
      console.error('Error searching tasks:', error);
      setError('Failed to search tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setTasks([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Search Tasks</h2>
        <form onSubmit={handleSearch}>
          <div className="mb-4">
            <label htmlFor="searchInput" className="block text-gray-700 mb-2">
              Title
            </label>
            <input
              id="searchInput"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex">
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded mr-2">
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button type="button" className="w-full bg-gray-300 text-gray-800 py-3 rounded" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>
      <div className="mt-6 max-w-md w-full bg-white rounded-lg shadow-md">
        {error && <p className="p-4 text-center text-red-600">{error}</p>}
        {tasks.length > 0 && (
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="p-4 border-b border-gray-300 last:border-b-0">
                <h3 className="text-xl font-bold">{task.title}</h3>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-sm text-gray-600">Status: {task.status}</p>
              </li>
            ))}
          </ul>
        )}
        {tasks.length === 0 && !loading && (
          <p className="p-4 text-center text-gray-600">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchTask;
