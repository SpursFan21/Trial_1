import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  const { name, status, userId } = await request.json();
  const newTask = await prisma.task.create({
    data: {
      name,
      status,
      userId,
    },
  });
  return NextResponse.json(newTask);
}
