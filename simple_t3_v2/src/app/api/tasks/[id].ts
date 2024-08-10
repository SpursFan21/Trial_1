import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { name, status } = await request.json();
  const updatedTask = await prisma.task.update({
    where: { id: params.id },
    data: { name, status },
  });
  return NextResponse.json(updatedTask);
}

export async function DELETE({ params }: { params: { id: string } }) {
  await prisma.task.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ message: 'Task deleted' });
}
