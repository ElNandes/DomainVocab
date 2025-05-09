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

  const business = await prisma.domain.upsert({
    where: { name: 'Business' },
    update: {},
    create: {
      name: 'Business',
      description: 'Business and commerce vocabulary',
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

  // German vocabulary for Technology
  const germanTechVocabulary = [
    {
      word: 'Algorithmus',
      definition: 'Eine Reihe von Regeln oder Anweisungen, die einem Computer gegeben werden, um ein Problem zu lösen',
      examples: ['Der Suchalgorithmus fand schnell die relevanten Ergebnisse.'],
    },
    {
      word: 'Datenbank',
      definition: 'Eine strukturierte Sammlung von Daten, die elektronisch gespeichert und verwaltet wird',
      examples: ['Die Kundendaten werden in einer sicheren Datenbank gespeichert.'],
    },
    {
      word: 'Verschlüsselung',
      definition: 'Der Prozess der Umwandlung von Informationen in einen sicheren Code',
      examples: ['Die Nachricht wurde mit starker Verschlüsselung geschützt.'],
    }
  ]

  // German vocabulary for Business
  const germanBusinessVocabulary = [
    {
      word: 'Marketing',
      definition: 'Die Aktivitäten zur Förderung und zum Verkauf von Produkten oder Dienstleistungen',
      examples: ['Das Marketing-Team entwickelte eine neue Werbekampagne.'],
    },
    {
      word: 'Investition',
      definition: 'Die Verwendung von Geld oder Kapital, um Einkommen oder Gewinn zu erzielen',
      examples: ['Die Firma plant eine große Investition in neue Technologien.'],
    },
    {
      word: 'Geschäftsmodell',
      definition: 'Ein Plan für die erfolgreiche Führung eines Unternehmens',
      examples: ['Das neue Geschäftsmodell konzentriert sich auf Online-Verkäufe.'],
    }
  ]

  // German vocabulary for Science
  const germanScienceVocabulary = [
    {
      word: 'Hypothese',
      definition: 'Eine wissenschaftliche Annahme, die durch Experimente überprüft werden kann',
      examples: ['Die Wissenschaftler testeten ihre Hypothese in mehreren Experimenten.'],
    },
    {
      word: 'Experiment',
      definition: 'Eine kontrollierte Untersuchung zur Überprüfung einer Hypothese',
      examples: ['Das Experiment bestätigte die ursprüngliche Theorie.'],
    },
    {
      word: 'Theorie',
      definition: 'Ein System von Ideen zur Erklärung bestimmter Phänomene',
      examples: ['Die Evolutionstheorie wurde durch zahlreiche Beweise gestützt.'],
    }
  ]

  // Spanish vocabulary for Technology
  const spanishTechVocabulary = [
    {
      word: 'algoritmo',
      definition: 'Un conjunto de reglas o instrucciones dadas a una computadora para ayudarla a resolver un problema',
      examples: ['El algoritmo de búsqueda encontró rápidamente los resultados relevantes.'],
    },
    {
      word: 'base de datos',
      definition: 'Una colección estructurada de datos almacenados y gestionados electrónicamente',
      examples: ['Los datos de los clientes se almacenan en una base de datos segura.'],
    },
    {
      word: 'encriptación',
      definition: 'El proceso de convertir información en un código seguro',
      examples: ['El mensaje estaba protegido con encriptación fuerte.'],
    }
  ]

  // Spanish vocabulary for Business
  const spanishBusinessVocabulary = [
    {
      word: 'marketing',
      definition: 'Las actividades para promover y vender productos o servicios',
      examples: ['El equipo de marketing desarrolló una nueva campaña publicitaria.'],
    },
    {
      word: 'inversión',
      definition: 'El uso de dinero o capital para obtener ingresos o ganancias',
      examples: ['La empresa planea una gran inversión en nuevas tecnologías.'],
    },
    {
      word: 'modelo de negocio',
      definition: 'Un plan para el funcionamiento exitoso de una empresa',
      examples: ['El nuevo modelo de negocio se centra en las ventas en línea.'],
    }
  ]

  // Spanish vocabulary for Science
  const spanishScienceVocabulary = [
    {
      word: 'hipótesis',
      definition: 'Una suposición científica que puede ser verificada mediante experimentos',
      examples: ['Los científicos probaron su hipótesis en varios experimentos.'],
    },
    {
      word: 'experimento',
      definition: 'Una investigación controlada para verificar una hipótesis',
      examples: ['El experimento confirmó la teoría original.'],
    },
    {
      word: 'teoría',
      definition: 'Un sistema de ideas para explicar ciertos fenómenos',
      examples: ['La teoría de la evolución fue respaldada por numerosas pruebas.'],
    }
  ]

  // Create German vocabulary
  for (const vocab of germanTechVocabulary) {
    try {
      await prisma.vocabulary.create({
        data: {
          ...vocab,
          language: 'de',
          domainId: technology.id,
        },
      })
    } catch (error) {
      console.log(`German technology vocabulary "${vocab.word}" already exists`)
    }
  }

  for (const vocab of germanBusinessVocabulary) {
    try {
      await prisma.vocabulary.create({
        data: {
          ...vocab,
          language: 'de',
          domainId: business.id,
        },
      })
    } catch (error) {
      console.log(`German business vocabulary "${vocab.word}" already exists`)
    }
  }

  for (const vocab of germanScienceVocabulary) {
    try {
      await prisma.vocabulary.create({
        data: {
          ...vocab,
          language: 'de',
          domainId: science.id,
        },
      })
    } catch (error) {
      console.log(`German science vocabulary "${vocab.word}" already exists`)
    }
  }

  // Create Spanish vocabulary
  for (const vocab of spanishTechVocabulary) {
    try {
      await prisma.vocabulary.create({
        data: {
          ...vocab,
          language: 'es',
          domainId: technology.id,
        },
      })
    } catch (error) {
      console.log(`Spanish technology vocabulary "${vocab.word}" already exists`)
    }
  }

  for (const vocab of spanishBusinessVocabulary) {
    try {
      await prisma.vocabulary.create({
        data: {
          ...vocab,
          language: 'es',
          domainId: business.id,
        },
      })
    } catch (error) {
      console.log(`Spanish business vocabulary "${vocab.word}" already exists`)
    }
  }

  for (const vocab of spanishScienceVocabulary) {
    try {
      await prisma.vocabulary.create({
        data: {
          ...vocab,
          language: 'es',
          domainId: science.id,
        },
      })
    } catch (error) {
      console.log(`Spanish science vocabulary "${vocab.word}" already exists`)
    }
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