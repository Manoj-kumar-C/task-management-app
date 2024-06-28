// app/page.tsx
'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = document.cookie.includes('isAuthenticated=true');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen py-2 bg-gray-50">
      <div className="md:w-1/2 w-full flex justify-center p-4">
        <img
          src="/images/todos.jpg" // Ensure you have this image in your public/images folder
          alt="Task Management"
          className="w-auto md:w-full h-fit  rounded-3xl"
        />
      </div>
      <div className="md:w-1/2 w-full flex flex-col items-center md:items-start p-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Welcome to Task Management App</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 text-center md:text-left">Manage your tasks efficiently and effectively.</p>
        <div className="mt-8">
          <Link href="/tasks" className="px-6 py-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          
              Go to Tasks
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
