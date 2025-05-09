import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create domains
  const technology = await prisma.domain.create({
    data: {
      name: 'Technology',
      description: 'Tech-related vocabulary',
    },
  })

  const business = await prisma.domain.create({
    data: {
      name: 'Business',
      description: 'Business and finance terms',
    },
  })

  const science = await prisma.domain.create({
    data: {
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
        'Machine learning algorithms can predict user behavior.',
      ],
    },
    {
      word: 'API',
      definition: 'Application Programming Interface - a set of rules that allows programs to talk to each other',
      examples: [
        'The app uses the Twitter API to fetch tweets.',
        'Developers use APIs to integrate different services.',
      ],
    },
    {
      word: 'Cloud Computing',
      definition: 'The delivery of computing services over the internet',
      examples: [
        'Many companies store their data in the cloud.',
        'Cloud computing allows for flexible resource allocation.',
      ],
    },
    {
      word: 'Cybersecurity',
      definition: 'The practice of protecting systems and networks from digital attacks',
      examples: [
        'Good cybersecurity practices include using strong passwords.',
        'Companies invest heavily in cybersecurity measures.',
      ],
    },
    {
      word: 'Database',
      definition: 'An organized collection of structured information or data',
      examples: [
        'The customer information is stored in the database.',
        'Databases help manage large amounts of data efficiently.',
      ],
    },
    {
      word: 'Encryption',
      definition: 'The process of converting information into a secure code',
      examples: [
        'End-to-end encryption ensures message privacy.',
        'The file is encrypted for security purposes.',
      ],
    },
    {
      word: 'Firewall',
      definition: 'A network security device that monitors and filters network traffic',
      examples: [
        'The firewall blocked suspicious incoming connections.',
        'Always keep your firewall enabled for protection.',
      ],
    },
    {
      word: 'Interface',
      definition: 'A point where two systems meet and interact',
      examples: [
        'The user interface needs to be more intuitive.',
        'The API provides an interface between applications.',
      ],
    },
    {
      word: 'Protocol',
      definition: 'A set of rules for data exchange between devices',
      examples: [
        'HTTP is a protocol for web communication.',
        'The devices communicate using a standard protocol.',
      ],
    },
    {
      word: 'Virtualization',
      definition: 'The creation of a virtual version of something',
      examples: [
        'Server virtualization helps optimize resource usage.',
        'Virtual machines run multiple operating systems.',
      ],
    },
  ]

  // Business vocabulary
  const businessTerms = [
    {
      word: 'ROI',
      definition: 'Return on Investment - a measure of the profitability of an investment',
      examples: [
        'The marketing campaign showed a positive ROI.',
        'Investors analyze ROI before making decisions.',
      ],
    },
    {
      word: 'KPI',
      definition: 'Key Performance Indicator - a measurable value that demonstrates effectiveness',
      examples: [
        'Sales growth is a key KPI for the business.',
        'The team tracks multiple KPIs to measure success.',
      ],
    },
    {
      word: 'Revenue',
      definition: 'The total income generated from business activities',
      examples: [
        'The company\'s revenue increased by 20% this quarter.',
        'Subscription revenue provides stable income.',
      ],
    },
    {
      word: 'Profit Margin',
      definition: 'The percentage of revenue that remains as profit',
      examples: [
        'The business maintains a healthy profit margin.',
        'Higher profit margins indicate better efficiency.',
      ],
    },
    {
      word: 'Market Share',
      definition: 'The percentage of total sales in an industry',
      examples: [
        'The company aims to increase its market share.',
        'Market share is a key indicator of competitiveness.',
      ],
    },
    {
      word: 'Cash Flow',
      definition: 'The movement of money in and out of a business',
      examples: [
        'Positive cash flow is essential for operations.',
        'The business needs to improve its cash flow.',
      ],
    },
    {
      word: 'Stakeholder',
      definition: 'A person or group with an interest in a business',
      examples: [
        'Stakeholders include employees, investors, and customers.',
        'The project considers all stakeholder needs.',
      ],
    },
    {
      word: 'Venture Capital',
      definition: 'Funding provided to startups and small businesses',
      examples: [
        'The startup secured venture capital funding.',
        'Venture capitalists look for high-growth potential.',
      ],
    },
    {
      word: 'Merger',
      definition: 'The combination of two companies into one',
      examples: [
        'The merger created a market leader.',
        'The companies announced their merger plans.',
      ],
    },
    {
      word: 'Acquisition',
      definition: 'The purchase of one company by another',
      examples: [
        'The tech giant made a major acquisition.',
        'The acquisition expanded our market presence.',
      ],
    },
  ]

  // Science vocabulary
  const scienceTerms = [
    {
      word: 'Hypothesis',
      definition: 'A proposed explanation for a phenomenon',
      examples: [
        'The scientist developed a hypothesis about climate change.',
        'The experiment was designed to test the hypothesis.',
      ],
    },
    {
      word: 'Molecule',
      definition: 'The smallest unit of a chemical compound',
      examples: [
        'Water molecules consist of two hydrogen atoms and one oxygen atom.',
        'The structure of the molecule was analyzed.',
      ],
    },
    {
      word: 'Ecosystem',
      definition: 'A community of living organisms and their environment',
      examples: [
        'The coral reef ecosystem is highly diverse.',
        'Human activities impact natural ecosystems.',
      ],
    },
    {
      word: 'Gravity',
      definition: 'The force that attracts objects toward each other',
      examples: [
        'Earth\'s gravity keeps the moon in orbit.',
        'Objects fall due to the force of gravity.',
      ],
    },
    {
      word: 'Evolution',
      definition: 'The process of biological change over time',
      examples: [
        'Darwin\'s theory of evolution explains species adaptation.',
        'Evolution occurs through natural selection.',
      ],
    },
    {
      word: 'Atom',
      definition: 'The basic unit of a chemical element',
      examples: [
        'Atoms combine to form molecules.',
        'The structure of the atom was discovered.',
      ],
    },
    {
      word: 'DNA',
      definition: 'Deoxyribonucleic acid - the molecule carrying genetic information',
      examples: [
        'DNA contains the instructions for life.',
        'Scientists study DNA to understand genetics.',
      ],
    },
    {
      word: 'Photosynthesis',
      definition: 'The process by which plants convert light into energy',
      examples: [
        'Plants use photosynthesis to produce food.',
        'Photosynthesis is essential for life on Earth.',
      ],
    },
    {
      word: 'Quantum',
      definition: 'The smallest possible unit of any physical property',
      examples: [
        'Quantum mechanics describes atomic behavior.',
        'Quantum computing uses quantum bits.',
      ],
    },
    {
      word: 'Vaccine',
      definition: 'A substance that stimulates immunity to a disease',
      examples: [
        'Vaccines have eradicated many diseases.',
        'The new vaccine was developed quickly.',
      ],
    },
  ]

  // Create vocabulary entries for each domain
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