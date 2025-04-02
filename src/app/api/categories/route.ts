import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories", extra: error },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { name, slug, description } = await req.json()
    
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description
      }
    })
    
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    )
  }
}