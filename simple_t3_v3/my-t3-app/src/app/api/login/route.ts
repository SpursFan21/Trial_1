// src/app/api/login/route.ts

import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { db } from '../../../server/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual secret

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Find user by email
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Adjust the expiration time as needed
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
