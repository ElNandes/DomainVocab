import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language') || 'en'
    
    console.log('Fetching vocabulary for language:', language)

    const domains = await prisma.domain.findMany({
      include: {
        vocabularies: {
          where: {
            language: language
          }
        }
      }
    })

    console.log('Found domains:', domains.length)
    console.log('Domains data:', JSON.stringify(domains, null, 2))
    console.log('Total vocabularies:', domains.reduce((acc, domain) => acc + domain.vocabularies.length, 0))

    // Transform the data to match the expected format
    const transformedDomains = domains.map(domain => ({
      id: domain.id,
      name: domain.name,
      vocabulary: domain.vocabularies.map(vocab => ({
        id: vocab.id,
        word: vocab.word,
        definition: vocab.definition,
        examples: vocab.examples
      }))
    }))

    console.log('Transformed domains:', JSON.stringify(transformedDomains, null, 2))

    return NextResponse.json(transformedDomains)
  } catch (error) {
    console.error('Error fetching vocabulary:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
    }
    return NextResponse.json(
      { error: 'Failed to fetch vocabulary', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { domainId, word, definition, examples, language = 'en' } = body

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
        language,
        domainId
      }
    })

    return NextResponse.json(vocabulary)
  } catch (error) {
    console.error('Error creating vocabulary:', error)
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
    }
    return NextResponse.json(
      { error: 'Failed to create vocabulary', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 