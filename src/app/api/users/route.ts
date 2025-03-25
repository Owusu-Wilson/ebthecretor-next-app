import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // You'll need to set this up
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';


export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        // Don't include password in the response!
      }
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    // Validate role
    const validRole = Object.values(Role).includes(role)
      ? role 
      : Role.USER; // Fallback to USER if invalid

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create user with properly typed role
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role: validRole // Now properly typed
      },
      select: { id: true, name: true, email: true, role: true }
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}