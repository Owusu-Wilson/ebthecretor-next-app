import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const portfolioId = formData.get('portfolioId') as string
    const file = formData.get('file') as File
    
    if (!file || !portfolioId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Save file to disk (adjust path as needed)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(process.cwd(), 'public/uploads', file.name)
    await writeFile(filePath, buffer)

    // Create database record
    const portfolioFile = await prisma.portfolioFile.create({
      data: {
        name: file.name,
        url: `/uploads/${file.name}`,
        type: file.type,
        size: file.size,
        portfolioId
      }
    })

    return NextResponse.json(portfolioFile, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
}