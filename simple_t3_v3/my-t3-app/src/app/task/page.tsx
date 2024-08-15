// src/app/task/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Task {
  id: number;
  title: string;
  state: 'not started' | 'in progress' | 'completed';
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [state, setState] = useState<'not started' | 'in progress' | 'completed'>('not started');
  const router = useRouter();

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    const fetchTasks = async () => {
      const response = await fetch('/api/task');
      const data: Task[] = await response.json(); // Ensure the data is typed correctly
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add tasks');
      return;
    }

    const response = await fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, state, userId: 1 }), // Use actual userId
    });

    if (response.ok) {
      const newTask: Task = await response.json();
      setTasks([...tasks, newTask]);
      setTitle('');
      setState('not started');
    } else {
      alert('Failed to add task');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/'); // Redirect to the login page
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-100">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Task List</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleAddTask} className="bg-white p-6 rounded shadow-md mb-4">
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">State</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={state}
            onChange={(e) => setState(e.target.value as 'not started' | 'in progress' | 'completed')}
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mb-2 p-2 border border-gray-300 rounded">
              <h3 className="font-semibold">{task.title}</h3>
              <p>Status: {task.state}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
