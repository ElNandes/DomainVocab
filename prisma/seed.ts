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

  // German vocabulary
  const germanVocabulary = [
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
    },
    {
      word: 'Firewall',
      definition: 'Ein Netzwerksicherheitssystem, das den Datenverkehr überwacht und filtert',
      examples: ['Die Firewall blockierte verdächtige Verbindungen.'],
    },
    {
      word: 'Programmierung',
      definition: 'Der Prozess der Erstellung von Computerprogrammen',
      examples: ['Sie lernt Programmierung an der Universität.'],
    },
    {
      word: 'Netzwerk',
      definition: 'Ein System von miteinander verbundenen Computern oder Geräten',
      examples: ['Das Unternehmen hat ein großes Netzwerk von Servern.'],
    },
    {
      word: 'Software',
      definition: 'Programme und Anwendungen, die auf einem Computer ausgeführt werden',
      examples: ['Die neue Software verbessert die Produktivität.'],
    },
    {
      word: 'Hardware',
      definition: 'Die physischen Komponenten eines Computersystems',
      examples: ['Die Hardware muss regelmäßig gewartet werden.'],
    },
    {
      word: 'Benutzeroberfläche',
      definition: 'Der Teil eines Programms, mit dem Benutzer interagieren',
      examples: ['Die Benutzeroberfläche ist intuitiv und benutzerfreundlich.'],
    },
    {
      word: 'Server',
      definition: 'Ein Computer oder System, das Ressourcen für andere Computer bereitstellt',
      examples: ['Der Server verarbeitet tausende Anfragen pro Minute.'],
    }
  ]

  // Spanish vocabulary
  const spanishVocabulary = [
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
    },
    {
      word: 'cortafuegos',
      definition: 'Un sistema de seguridad de red que monitorea y filtra el tráfico',
      examples: ['El cortafuegos bloqueó conexiones sospechosas.'],
    },
    {
      word: 'programación',
      definition: 'El proceso de crear programas informáticos',
      examples: ['Está aprendiendo programación en la universidad.'],
    },
    {
      word: 'red',
      definition: 'Un sistema de computadoras o dispositivos interconectados',
      examples: ['La empresa tiene una gran red de servidores.'],
    },
    {
      word: 'software',
      definition: 'Programas y aplicaciones que se ejecutan en una computadora',
      examples: ['El nuevo software mejora la productividad.'],
    },
    {
      word: 'hardware',
      definition: 'Los componentes físicos de un sistema informático',
      examples: ['El hardware necesita mantenimiento regular.'],
    },
    {
      word: 'interfaz de usuario',
      definition: 'La parte de un programa con la que interactúan los usuarios',
      examples: ['La interfaz de usuario es intuitiva y fácil de usar.'],
    },
    {
      word: 'servidor',
      definition: 'Una computadora o sistema que proporciona recursos a otras computadoras',
      examples: ['El servidor procesa miles de solicitudes por minuto.'],
    }
  ]

  // Create German vocabulary
  for (const vocab of germanVocabulary) {
    try {
      await prisma.vocabulary.create({
        data: {
          ...vocab,
          language: 'de',
          domainId: technology.id,
        },
      })
    } catch (error) {
      console.log(`German vocabulary "${vocab.word}" already exists`)
    }
  }

  // Create Spanish vocabulary
  for (const vocab of spanishVocabulary) {
    try {
      await prisma.vocabulary.create({
        data: {
          ...vocab,
          language: 'es',
          domainId: technology.id,
        },
      })
    } catch (error) {
      console.log(`Spanish vocabulary "${vocab.word}" already exists`)
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