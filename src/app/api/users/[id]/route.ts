import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Await the params here
) {
  try {
    // Await the params since it is a Promise
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Await the params here
) {
  try {
    // Await the params since it is a Promise
    const { id } = await params;
    
    const { name, email, role } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role: role as Role
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
