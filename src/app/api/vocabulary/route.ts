import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('Fetching domains and vocabulary...')
    const domains = await prisma.domain.findMany({
      include: {
        vocabularies: true
      }
    })
    console.log('Found domains:', domains.length)
    return NextResponse.json(domains)
  } catch (error) {
    console.error('Error fetching vocabulary:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      })
    }
    return NextResponse.json(
      { error: 'Failed to fetch vocabulary' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { domainId, word, definition, examples } = body

    if (!domainId || !word || !definition) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const vocabulary = await prisma.vocabulary.create({
      data: {
        word,
        definition,
        examples: examples || [],
        domainId
      }
    })

    return NextResponse.json(vocabulary)
  } catch (error) {
    console.error('Error creating vocabulary:', error)
    return NextResponse.json(
      { error: 'Failed to create vocabulary' },
      { status: 500 }
    )
  }
} 