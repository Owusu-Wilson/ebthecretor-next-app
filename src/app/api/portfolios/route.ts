import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      include: {
        category: true,
        files: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(portfolios)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, coverImage, categoryId, tags } = await req.json()
    
    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        description,
        coverImage,
        tags,
        category: {
          connect: { id: categoryId }
        }
      },
      include: {
        category: true
      }
    })
    
    return NextResponse.json(portfolio, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    )
  }
}