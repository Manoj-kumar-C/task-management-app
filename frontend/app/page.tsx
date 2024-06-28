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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Task Management App</h1>
      <p className="mt-4 text-lg text-gray-600">Manage your tasks efficiently and effectively.</p>
      <div className="mt-8">
        <Link href="/tasks" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Go to Tasks
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
