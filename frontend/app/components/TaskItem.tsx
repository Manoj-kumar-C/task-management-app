// frontend/components/TaskItem.tsx
import React from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

const TaskItem: React.FC<{ task: Task; fetchTasks: () => void }> = ({ task, fetchTasks }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      await axios.put(`/api/tasks/${task.id}`, {
        ...task,
        status: e.target.value,
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md flex justify-between items-center">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="flex items-center space-x-4">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="px-2 py-1 border border-gray-300 rounded-md"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
