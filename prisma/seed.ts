import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create domains
  const technology = await prisma.domain.upsert({
    where: { name: 'Technology' },
    update: {},
    create: {
      name: 'Technology',
      description: 'Technology-related vocabulary',
    },
  })

  // Create vocabulary for English
  try {
    await prisma.vocabulary.create({
      data: {
        word: 'algorithm',
        definition: 'A set of rules or instructions given to a computer to help it solve a problem',
        examples: ['The search algorithm quickly found the relevant results.'],
        language: 'en',
        domainId: technology.id,
      },
    })
  } catch (error) {
    console.log('English vocabulary already exists')
  }

  // Create vocabulary for German
  try {
    await prisma.vocabulary.create({
      data: {
        word: 'Algorithmus',
        definition: 'Eine Reihe von Regeln oder Anweisungen, die einem Computer gegeben werden, um ein Problem zu lösen',
        examples: ['Der Suchalgorithmus fand schnell die relevanten Ergebnisse.'],
        language: 'de',
        domainId: technology.id,
      },
    })
  } catch (error) {
    console.log('German vocabulary already exists')
  }

  // Create vocabulary for Spanish
  try {
    await prisma.vocabulary.create({
      data: {
        word: 'algoritmo',
        definition: 'Un conjunto de reglas o instrucciones dadas a una computadora para ayudarla a resolver un problema',
        examples: ['El algoritmo de búsqueda encontró rápidamente los resultados relevantes.'],
        language: 'es',
        domainId: technology.id,
      },
    })
  } catch (error) {
    console.log('Spanish vocabulary already exists')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 