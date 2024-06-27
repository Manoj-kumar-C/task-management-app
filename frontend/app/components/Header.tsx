import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-600 p-4 text-white">
      <nav className="container mx-auto flex justify-between">
        <div>
          <Link href="/" className="font-bold text-lg">
            Task Manager
          </Link>
        </div>
        <div>
          <Link href="/add-task" className="mr-4">
            Add Task
          </Link>
          <Link href="/tasks" className="mr-4">
            View Tasks
          </Link>
          <Link href="/search-task">
            Search Task
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
