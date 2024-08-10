// src/components/TaskList.tsx

import React, { useEffect, useState } from 'react';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<any[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks');
            const data = await response.json();
            setTasks(data.tasks);
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name} - {task.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
