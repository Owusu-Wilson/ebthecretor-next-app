import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        files: true
      }
    })

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(portfolio)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, coverImage, categoryId, tags } = await req.json()
    
    const updatedPortfolio = await prisma.portfolio.update({
      where: { id: params.id },
      data: {
        title,
        description,
        coverImage,
        tags,
        categoryId
      },
      include: {
        category: true
      }
    })
    
    return NextResponse.json(updatedPortfolio)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // First delete all associated files
    await prisma.portfolioFile.deleteMany({
      where: { portfolioId: params.id }
    })
    
    // Then delete the portfolio
    await prisma.portfolio.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete portfolio" },
      { status: 500 }
    )
  }
}