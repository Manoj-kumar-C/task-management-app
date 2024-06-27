"use client"
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSortedTasks(tasks.filter((task) => task.title.toLowerCase().includes(query.toLowerCase())));
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sorted = [...sortedTasks].sort((a, b) => {
      const compare = a.title.localeCompare(b.title);
      return newSortOrder === 'asc' ? compare : -compare;
    });

    setSortedTasks(sorted);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={handleSort}
          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </button>
      </div>
      {sortedTasks.map((task) => (
        <div key={task.id} className="p-4 border border-gray-300 rounded-md shadow-sm">
          <h3 className="text-lg font-medium">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
          <select
            value={task.status}
            onChange={(e) => onUpdate(task.id, e.target.value)}
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button
            onClick={() => onDelete(task.id)}
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
