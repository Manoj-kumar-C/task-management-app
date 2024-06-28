"use client"
import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-blue-600 p-4 text-white">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="font-bold text-lg">
            Task Manager
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/add-task">
            Add Task
          </Link>
          <Link href="/tasks">
            View Tasks
          </Link>
          <Link href="/search-task">
            Search Task
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden">
          <Link href="/add-task" className="block px-4 py-2">
            Add Task
          </Link>
          <Link href="/tasks" className="block px-4 py-2">
            View Tasks
          </Link>
          <Link href="/search-task" className="block px-4 py-2">
            Search Task
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
