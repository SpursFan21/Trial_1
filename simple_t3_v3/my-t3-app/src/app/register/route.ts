// src/app/api/register/route.ts

import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../server/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual secret

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  // Hash the password
  const hashedPassword = await hash(password, 10);

  // Save user in the database
  const user = await db.user.create({
    data: { name, email, password: hashedPassword },
  });

  // Generate a JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' } // Adjust the expiration time as needed
  );

  return NextResponse.json({ token });
}
