"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const Tasks = () => {
  useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('All');
  const [editTask, setEditTask] = useState<Task | null>(null); // State to hold task being edited

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

  const handleDeleteTask = async (taskId: number) => {
    try {
      await axios.delete(`http://localhost:3307/api/tasks/tasks/${taskId}`);
      // After deletion, fetch updated tasks
      fetchTasks();
      alert('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      await axios.put(`http://localhost:3307/api/tasks/tasks/${updatedTask.id}`, updatedTask);
      // After update, fetch updated tasks
      fetchTasks();
      setEditTask(null); // Clear edit mode
      alert('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tasks</h2>
        <div className="mb-8 w-full">
          <label className="block text-gray-700 mb-2">Filter by status</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          >
            <option value="All">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li key={task.id} className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-center">
                {editTask?.id === task.id ? (
                  <div className="w-full">
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={editTask.title}
                        onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Description</label>
                      <textarea
                        value={editTask.description}
                        onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Status</label>
                      <select
                        value={editTask.status}
                        onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                        onClick={() => handleUpdateTask(editTask)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        onClick={() => setEditTask(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-gray-700">{task.description}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`inline-block px-3 py-1 text-sm rounded-full ${
                            task.status === 'To Do'
                              ? 'bg-yellow-200 text-yellow-800'
                              : task.status === 'In Progress'
                              ? 'bg-blue-200 text-blue-800'
                              : 'bg-green-200 text-green-800'
                          }`}
                        >
                          {task.status}
                        </span>
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => handleEditTask(task)}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 15v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2m14-9h-4V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2z" />
                          </svg>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
