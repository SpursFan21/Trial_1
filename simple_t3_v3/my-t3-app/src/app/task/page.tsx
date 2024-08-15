// src/app/task/page.tsx

import { useState, useEffect } from 'react';

interface Task {
  id: string;
  name: string;
  state: string;
}

export default function TaskPage() {
  const [taskName, setTaskName] = useState('');
  const [taskState, setTaskState] = useState('not started');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch tasks from the API when the component mounts
    async function fetchTasks() {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        setError('Failed to load tasks');
      }
    }

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: taskName, state: taskState }),
    });

    if (response.ok) {
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTaskName('');
      setTaskState('not started');
    } else {
      setError('Failed to add task');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      <div className="mb-4">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          className="border p-2 mr-2"
        />
        <select
          value={taskState}
          onChange={(e) => setTaskState(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="complete">Complete</option>
        </select>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-2"
        >
          Add Task
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="border-b py-2">
            <span className="font-bold">{task.name}</span> - {task.state}
          </li>
        ))}
      </ul>
    </div>
  );
}
