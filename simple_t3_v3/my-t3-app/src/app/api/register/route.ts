// src/app/api/register/route.ts

import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '../../../server/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual secret

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  try {
    // Check if a user with the given email already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // If user exists, return an error response
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 400 }
      );
    }

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

    // Return the token
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json(
      { message: 'Registration failed' },
      { status: 500 }
    );
  }
}
