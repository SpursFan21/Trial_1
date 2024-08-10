// src/app/api/tasks/route.ts

import { NextResponse } from 'next/server';

// Handle GET requests
export async function GET() {
    // Logic to fetch tasks from the database
    return NextResponse.json({ message: 'Fetching tasks' });
}

// Handle POST requests
export async function POST(request: Request) {
    const data = await request.json();
    // Logic to create a new task
    return NextResponse.json({ message: 'Task created', data });
}

// Handle PUT requests
export async function PUT(request: Request) {
    const data = await request.json();
    // Logic to update an existing task
    return NextResponse.json({ message: 'Task updated', data });
}

// Handle DELETE requests
export async function DELETE(request: Request) {
    const { id } = await request.json();
    // Logic to delete a task
    return NextResponse.json({ message: 'Task deleted', id });
}
