import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from 'prisma';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  // Hash the password
  const hashedPassword = await hash(password, 10);

  // Save user in the database
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  // Generate a JWT token (this is a placeholder, implement JWT generation)
  const token = "generated-jwt-token";

  return NextResponse.json({ token });
}
