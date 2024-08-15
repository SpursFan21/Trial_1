// src/app/api/tasks/route.ts

import { NextResponse } from 'next/server';
import { db } from '../../../server/db';

export async function GET() {
  try {
    const tasks = await db.task.findMany();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, completed, userId } = await request.json();

    // Ensure you provide a valid userId from the authenticated user
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const task = await db.task.create({
      data: {
        title,
        completed,
        userId,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
