import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET() {
  try {
    const categories = await prisma.contactInfo.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contact handles", extra: error },
      { status: 500 }
    )
  }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, value } = req.body;

    // Basic validation
    if (!name || !value) {
      return res.status(400).json({ error: 'Name and value are required.' });
    }

    try {
      const newContact = await prisma.contactInfo.create({
        data: { name, value },
      });

      return res.status(201).json(newContact);
    } catch (error) {
      console.error('Error creating contact info:', error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed.' });
  }
}
