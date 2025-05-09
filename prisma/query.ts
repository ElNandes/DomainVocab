import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function queryDatabase() {
  try {
    // Get all domains with their vocabulary
    const domains = await prisma.domain.findMany({
      include: {
        vocabularies: true
      }
    })

    console.log('\n=== Database Contents ===\n')
    
    for (const domain of domains) {
      console.log(`\nDomain: ${domain.name}`)
      console.log(`Description: ${domain.description}`)
      console.log('\nVocabulary:')
      
      for (const vocab of domain.vocabularies) {
        console.log(`\n  Word: ${vocab.word}`)
        console.log(`  Definition: ${vocab.definition}`)
        console.log('  Examples:')
        vocab.examples.forEach((example, index) => {
          console.log(`    ${index + 1}. ${example}`)
        })
      }
      console.log('\n' + '-'.repeat(50))
    }
  } catch (error) {
    console.error('Error querying database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

queryDatabase() 