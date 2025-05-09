import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create or update domains
  const technology = await prisma.domain.upsert({
    where: { name: 'Technology' },
    update: {},
    create: {
      name: 'Technology',
      description: 'Tech-related vocabulary',
    },
  })

  const business = await prisma.domain.upsert({
    where: { name: 'Business' },
    update: {},
    create: {
      name: 'Business',
      description: 'Business and finance terms',
    },
  })

  const science = await prisma.domain.upsert({
    where: { name: 'Science' },
    update: {},
    create: {
      name: 'Science',
      description: 'Scientific terminology',
    },
  })

  // Technology vocabulary
  const techTerms = [
    {
      word: 'Algorithm',
      definition: 'A set of rules or instructions given to a computer to solve a problem',
      examples: [
        'The search algorithm quickly found the relevant results.',
        'Machine learning algorithms can predict user behavior.'
      ],
    },
    {
      word: 'API',
      definition: 'Application Programming Interface - a set of rules that allows programs to talk to each other',
      examples: [
        'The app uses the Twitter API to fetch tweets.',
        'Developers use APIs to integrate different services.'
      ],
    },
    // Add more technology terms here
  ]

  // Business vocabulary
  const businessTerms = [
    {
      word: 'ROI',
      definition: 'Return on Investment - a measure of the profitability of an investment',
      examples: [
        'The marketing campaign showed a positive ROI.',
        'Investors analyze ROI before making decisions.'
      ],
    },
    {
      word: 'KPI',
      definition: 'Key Performance Indicator - a measurable value that demonstrates effectiveness',
      examples: [
        'Sales growth is a key KPI for the business.',
        'The team tracks multiple KPIs to measure success.'
      ],
    },
    // Add more business terms here
  ]

  // Science vocabulary
  const scienceTerms = [
    {
      word: 'Hypothesis',
      definition: 'A proposed explanation for a phenomenon',
      examples: [
        'The scientist developed a hypothesis about climate change.',
        'The experiment was designed to test the hypothesis.'
      ],
    },
    {
      word: 'Molecule',
      definition: 'The smallest unit of a chemical compound',
      examples: [
        'Water molecules consist of two hydrogen atoms and one oxygen atom.',
        'The structure of the molecule was analyzed.'
      ],
    },
    // Add more science terms here
  ]

  // Delete existing vocabulary for each domain
  await prisma.vocabulary.deleteMany({
    where: {
      domainId: {
        in: [technology.id, business.id, science.id]
      }
    }
  })

  // Create vocabulary entries
  for (const term of techTerms) {
    await prisma.vocabulary.create({
      data: {
        ...term,
        domainId: technology.id,
      },
    })
  }

  for (const term of businessTerms) {
    await prisma.vocabulary.create({
      data: {
        ...term,
        domainId: business.id,
      },
    })
  }

  for (const term of scienceTerms) {
    await prisma.vocabulary.create({
      data: {
        ...term,
        domainId: science.id,
      },
    })
  }

  console.log('Database has been seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 