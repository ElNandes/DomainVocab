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
            language,
          },
        },
      },
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
        examples: vocab.examples,
        language: vocab.language,
      })),
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
    const { translations } = await request.json()

    if (!translations || !Array.isArray(translations)) {
      return NextResponse.json(
        { error: 'Invalid request: translations array is required' },
        { status: 400 }
      )
    }

    // Create vocabulary entries for each language
    const createdEntries = await Promise.all(
      translations.map(async (translation) => {
        const { language, word, definition, examples, domainId } = translation

        if (!language || !word || !definition || !domainId) {
          throw new Error(`Missing required fields for ${language} translation`)
        }

        return prisma.vocabulary.create({
          data: {
            word,
            definition,
            examples: examples || [],
            language,
            domainId,
          },
        })
      })
    )

    return NextResponse.json(createdEntries)
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
      { error: error instanceof Error ? error.message : 'Failed to create vocabulary' },
      { status: 500 }
    )
  }
} 