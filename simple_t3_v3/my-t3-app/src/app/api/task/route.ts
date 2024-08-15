// src/app/api/tasks/route.ts

import { NextResponse } from 'next/server';
import { db } from '../../../server/db'; // Ensure db is correctly set up

// Handler for GET requests to fetch tasks
export async function GET() {
  try {
    // Fetch all tasks from the database
    const tasks = await db.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

// Handler for POST requests to create a new task
export async function POST(request: Request) {
  try {
    const { title, completed, userId } = await request.json();

    // Validate the userId
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Create a new task in the database
    const task = await db.task.create({
      data: {
        title,
        completed,
        userId,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
