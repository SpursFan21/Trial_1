import React, { useEffect, useState } from 'react';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState({ name: '', status: 'NOT_STARTED', userId: 'some-user-id' }); // Include userId

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data.tasks);
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    const task = await response.json();
    setTasks([...tasks, task]);
    setNewTask({ name: '', status: 'NOT_STARTED', userId: 'some-user-id' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Task List</h1>
      <input
        name="name"
        value={newTask.name}
        onChange={handleChange}
        placeholder="Task name"
      />
      <select name="status" value={newTask.status} onChange={handleChange}>
        <option value="NOT_STARTED">Not Started</option>
        <option value="STARTED">Started</option>
        <option value="COMPLETE">Complete</option>
      </select>
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name} - {task.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
