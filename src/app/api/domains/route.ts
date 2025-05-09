import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const domains = await prisma.domain.findMany({
      include: {
        vocabularies: true
      }
    })
    return NextResponse.json(domains)
  } catch (error) {
    console.error('Error fetching domains:', error)
    return NextResponse.json(
      { error: 'Failed to fetch domains' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Domain name is required' },
        { status: 400 }
      )
    }

    // Check if domain with same name already exists
    const existingDomain = await prisma.domain.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    })

    if (existingDomain) {
      return NextResponse.json(
        { error: 'A domain with this name already exists' },
        { status: 400 }
      )
    }

    const domain = await prisma.domain.create({
      data: {
        name,
        description: description || ''
      }
    })

    return NextResponse.json(domain)
  } catch (error) {
    console.error('Error creating domain:', error)
    return NextResponse.json(
      { error: 'Failed to create domain' },
      { status: 500 }
    )
  }
} 