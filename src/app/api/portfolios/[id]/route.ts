import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params as it is now a Promise
    const { id } = await params;

    // Check if id is provided
    if (!id) {
      return NextResponse.json({ error: "Missing portfolio ID" }, { status: 400 });
    }

    // Fetch portfolio from the database using the id
    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: {
        category: true,
        files: true,
      },
    });

    // If portfolio not found, return 404
    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    // Return the found portfolio data
    return NextResponse.json(portfolio);
  } catch (error) {
    // Return error if anything goes wrong
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}



export async function PUT(
/**
 * Updates an existing portfolio with the given details.
 * 
 * @param {Request} req - The request object containing details of the portfolio to update.
 * @param {Promise<{ id: string }>} params - A promise resolving to an object with the portfolio ID.
 * 
 * @returns {Promise<Response>} - A JSON response containing the updated portfolio details or an error message.
 * 
 * @throws Will return a 500 error response if the update fails.
 */

  req: Request,
  { params }: { params: Promise<{ id: string }> } // Await the params here
) {
  try {
    // Await the params since it is a Promise
    const { id } = await params;

    const { title, description, coverImage, categoryId, tags } = await req.json();

    // Update the portfolio in the database
    const updatedPortfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        description,
        coverImage,
        tags,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(updatedPortfolio);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Await the params here
) {
  try {
    // Await the params since it is a Promise
    const { id } = await params;

    // First delete all associated files
    await prisma.portfolioFile.deleteMany({
      where: { portfolioId: id }, // Use `id` instead of `params.id`
    });
    
    // Then delete the portfolio
    await prisma.portfolio.delete({
      where: { id },
    });
    
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete portfolio" },
      { status: 500 }
    );
  }
}
