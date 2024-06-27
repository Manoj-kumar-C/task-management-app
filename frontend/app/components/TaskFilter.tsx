interface TaskFilterProps {
    status: string;
    onChange: (status: string) => void;
  }
  
  const TaskFilter: React.FC<TaskFilterProps> = ({ status, onChange }) => {
    return (
      <div className="mb-4">
        <select
          value={status}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
    );
  };
  
  export default TaskFilter;
  