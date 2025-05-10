import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const domains = [
  {
    name: 'Technology',
    description: 'Terms related to computers, software, and digital technology',
    vocabularies: [
      {
        word: 'Algorithm',
        definition: 'A set of rules or instructions given to a computer to help it solve a problem',
        examples: [
          'The search engine uses a complex algorithm to rank web pages.',
          'Machine learning algorithms can identify patterns in data.'
        ],
        language: 'en'
      },
      {
        word: 'Algorithm',
        definition: 'Ein Satz von Regeln oder Anweisungen, die einem Computer helfen, ein Problem zu lösen',
        examples: [
          'Die Suchmaschine verwendet einen komplexen Algorithmus, um Webseiten zu bewerten.',
          'Maschinelle Lernalgorithmen können Muster in Daten erkennen.'
        ],
        language: 'de'
      },
      {
        word: 'Algoritmo',
        definition: 'Un conjunto de reglas o instrucciones dadas a una computadora para ayudarla a resolver un problema',
        examples: [
          'El motor de búsqueda utiliza un algoritmo complejo para clasificar páginas web.',
          'Los algoritmos de aprendizaje automático pueden identificar patrones en los datos.'
        ],
        language: 'es'
      },
      {
        word: 'API',
        definition: 'Application Programming Interface - a set of rules that allows programs to talk to each other',
        examples: [
          'The weather app uses an API to fetch current conditions.',
          'Developers use APIs to integrate different services.'
        ],
        language: 'en'
      },
      {
        word: 'API',
        definition: 'Application Programming Interface - ein Satz von Regeln, der es Programmen ermöglicht, miteinander zu kommunizieren',
        examples: [
          'Die Wetter-App verwendet eine API, um aktuelle Bedingungen abzurufen.',
          'Entwickler verwenden APIs, um verschiedene Dienste zu integrieren.'
        ],
        language: 'de'
      },
      {
        word: 'API',
        definition: 'Interfaz de Programación de Aplicaciones - un conjunto de reglas que permite a los programas comunicarse entre sí',
        examples: [
          'La aplicación del clima utiliza una API para obtener condiciones actuales.',
          'Los desarrolladores utilizan APIs para integrar diferentes servicios.'
        ],
        language: 'es'
      },
      {
        word: 'Cloud Computing',
        definition: 'The delivery of computing services over the internet',
        examples: [
          'Many companies store their data in the cloud.',
          'Cloud computing allows for flexible resource allocation.'
        ],
        language: 'en'
      },
      {
        word: 'Cloud Computing',
        definition: 'Die Bereitstellung von Computerdiensten über das Internet',
        examples: [
          'Viele Unternehmen speichern ihre Daten in der Cloud.',
          'Cloud Computing ermöglicht eine flexible Ressourcenzuweisung.'
        ],
        language: 'de'
      },
      {
        word: 'Computación en la Nube',
        definition: 'La entrega de servicios informáticos a través de internet',
        examples: [
          'Muchas empresas almacenan sus datos en la nube.',
          'La computación en la nube permite una asignación flexible de recursos.'
        ],
        language: 'es'
      },
      {
        word: 'Database',
        definition: 'An organized collection of structured information or data',
        examples: [
          'The company maintains a database of customer information.',
          'Databases are essential for storing and retrieving data efficiently.'
        ],
        language: 'en'
      },
      {
        word: 'Datenbank',
        definition: 'Eine organisierte Sammlung strukturierter Informationen oder Daten',
        examples: [
          'Das Unternehmen unterhält eine Datenbank mit Kundeninformationen.',
          'Datenbanken sind unerlässlich, um Daten effizient zu speichern und abzurufen.'
        ],
        language: 'de'
      },
      {
        word: 'Base de Datos',
        definition: 'Una colección organizada de información o datos estructurados',
        examples: [
          'La empresa mantiene una base de datos de información de clientes.',
          'Las bases de datos son esenciales para almacenar y recuperar datos de manera eficiente.'
        ],
        language: 'es'
      },
      {
        word: 'Encryption',
        definition: 'The process of converting information into a secure code',
        examples: [
          'The message was protected using strong encryption.',
          'Encryption helps keep sensitive data secure.'
        ],
        language: 'en'
      },
      {
        word: 'Verschlüsselung',
        definition: 'Der Prozess der Umwandlung von Informationen in einen sicheren Code',
        examples: [
          'Die Nachricht wurde mit starker Verschlüsselung geschützt.',
          'Verschlüsselung hilft, sensible Daten sicher zu halten.'
        ],
        language: 'de'
      },
      {
        word: 'Cifrado',
        definition: 'El proceso de convertir información en un código seguro',
        examples: [
          'El mensaje fue protegido utilizando un cifrado fuerte.',
          'El cifrado ayuda a mantener seguros los datos sensibles.'
        ],
        language: 'es'
      },
      {
        word: 'Firewall',
        definition: 'A security system that monitors and controls network traffic',
        examples: [
          'The firewall blocked suspicious incoming connections.',
          'Companies use firewalls to protect their networks.'
        ],
        language: 'en'
      },
      {
        word: 'Firewall',
        definition: 'Ein Sicherheitssystem, das den Netzwerkverkehr überwacht und steuert',
        examples: [
          'Die Firewall blockierte verdächtige eingehende Verbindungen.',
          'Unternehmen verwenden Firewalls, um ihre Netzwerke zu schützen.'
        ],
        language: 'de'
      },
      {
        word: 'Cortafuegos',
        definition: 'Un sistema de seguridad que monitorea y controla el tráfico de red',
        examples: [
          'El cortafuegos bloqueó conexiones entrantes sospechosas.',
          'Las empresas utilizan cortafuegos para proteger sus redes.'
        ],
        language: 'es'
      },
      {
        word: 'Interface',
        definition: 'The point of interaction between a user and a computer system',
        examples: [
          'The new software has a user-friendly interface.',
          'The interface design focuses on ease of use.'
        ],
        language: 'en'
      },
      {
        word: 'Schnittstelle',
        definition: 'Der Punkt der Interaktion zwischen einem Benutzer und einem Computersystem',
        examples: [
          'Die neue Software hat eine benutzerfreundliche Schnittstelle.',
          'Das Schnittstellendesign konzentriert sich auf Benutzerfreundlichkeit.'
        ],
        language: 'de'
      },
      {
        word: 'Interfaz',
        definition: 'El punto de interacción entre un usuario y un sistema informático',
        examples: [
          'El nuevo software tiene una interfaz amigable.',
          'El diseño de la interfaz se centra en la facilidad de uso.'
        ],
        language: 'es'
      },
      {
        word: 'Protocol',
        definition: 'A set of rules for exchanging data between devices',
        examples: [
          'HTTP is a protocol used for web communication.',
          'The devices communicate using a standard protocol.'
        ],
        language: 'en'
      },
      {
        word: 'Protokoll',
        definition: 'Ein Satz von Regeln für den Datenaustausch zwischen Geräten',
        examples: [
          'HTTP ist ein Protokoll, das für die Webkommunikation verwendet wird.',
          'Die Geräte kommunizieren über ein Standardprotokoll.'
        ],
        language: 'de'
      },
      {
        word: 'Protocolo',
        definition: 'Un conjunto de reglas para intercambiar datos entre dispositivos',
        examples: [
          'HTTP es un protocolo utilizado para la comunicación web.',
          'Los dispositivos se comunican utilizando un protocolo estándar.'
        ],
        language: 'es'
      },
      {
        word: 'Server',
        definition: 'A computer that provides data to other computers',
        examples: [
          'The web server hosts multiple websites.',
          'The company maintains its own email server.'
        ],
        language: 'en'
      },
      {
        word: 'Server',
        definition: 'Ein Computer, der Daten für andere Computer bereitstellt',
        examples: [
          'Der Webserver hostet mehrere Websites.',
          'Das Unternehmen unterhält seinen eigenen E-Mail-Server.'
        ],
        language: 'de'
      },
      {
        word: 'Servidor',
        definition: 'Una computadora que proporciona datos a otras computadoras',
        examples: [
          'El servidor web aloja múltiples sitios web.',
          'La empresa mantiene su propio servidor de correo electrónico.'
        ],
        language: 'es'
      },
      {
        word: 'Virtualization',
        definition: 'The creation of a virtual version of something',
        examples: [
          'Server virtualization allows multiple operating systems to run on one machine.',
          'Virtualization technology has revolutionized data centers.'
        ],
        language: 'en'
      },
      {
        word: 'Virtualisierung',
        definition: 'Die Erstellung einer virtuellen Version von etwas',
        examples: [
          'Die Servervirtualisierung ermöglicht es, mehrere Betriebssysteme auf einer Maschine auszuführen.',
          'Die Virtualisierungstechnologie hat Rechenzentren revolutioniert.'
        ],
        language: 'de'
      },
      {
        word: 'Virtualización',
        definition: 'La creación de una versión virtual de algo',
        examples: [
          'La virtualización de servidores permite ejecutar múltiples sistemas operativos en una máquina.',
          'La tecnología de virtualización ha revolucionado los centros de datos.'
        ],
        language: 'es'
      }
    ]
  },
  {
    name: 'Business',
    description: 'Terms related to commerce, management, and corporate operations',
    vocabularies: [
      {
        word: 'ROI',
        definition: 'Return on Investment - a measure of profitability',
        examples: [
          'The marketing campaign showed a positive ROI.',
          'Investors analyze ROI before making decisions.'
        ],
        language: 'en'
      },
      {
        word: 'ROI',
        definition: 'Return on Investment - ein Maß für die Rentabilität',
        examples: [
          'Die Marketingkampagne zeigte einen positiven ROI.',
          'Investoren analysieren den ROI, bevor sie Entscheidungen treffen.'
        ],
        language: 'de'
      },
      {
        word: 'ROI',
        definition: 'Retorno de Inversión - una medida de rentabilidad',
        examples: [
          'La campaña de marketing mostró un ROI positivo.',
          'Los inversores analizan el ROI antes de tomar decisiones.'
        ],
        language: 'es'
      },
      {
        word: 'KPI',
        definition: 'Key Performance Indicator - a measurable value that shows progress',
        examples: [
          'Sales growth is a key KPI for the company.',
          'The team tracks multiple KPIs to measure success.'
        ],
        language: 'en'
      },
      {
        word: 'KPI',
        definition: 'Key Performance Indicator - ein messbarer Wert, der Fortschritt zeigt',
        examples: [
          'Das Umsatzwachstum ist ein wichtiger KPI für das Unternehmen.',
          'Das Team verfolgt mehrere KPIs, um den Erfolg zu messen.'
        ],
        language: 'de'
      },
      {
        word: 'KPI',
        definition: 'Indicador Clave de Rendimiento - un valor medible que muestra el progreso',
        examples: [
          'El crecimiento de ventas es un KPI clave para la empresa.',
          'El equipo rastrea múltiples KPIs para medir el éxito.'
        ],
        language: 'es'
      },
      {
        word: 'Revenue',
        definition: 'The total income generated from business activities',
        examples: [
          'The company reported record revenue this quarter.',
          'Revenue growth is essential for business expansion.'
        ],
        language: 'en'
      },
      {
        word: 'Umsatz',
        definition: 'Das Gesamteinkommen aus Geschäftstätigkeiten',
        examples: [
          'Das Unternehmen meldete einen Rekordumsatz in diesem Quartal.',
          'Umsatzwachstum ist entscheidend für die Geschäftserweiterung.'
        ],
        language: 'de'
      },
      {
        word: 'Ingresos',
        definition: 'El ingreso total generado por actividades comerciales',
        examples: [
          'La empresa reportó ingresos récord este trimestre.',
          'El crecimiento de ingresos es esencial para la expansión del negocio.'
        ],
        language: 'es'
      },
      {
        word: 'Profit Margin',
        definition: 'The percentage of revenue that becomes profit',
        examples: [
          'The product has a high profit margin.',
          'Companies aim to increase their profit margins.'
        ],
        language: 'en'
      },
      {
        word: 'Gewinnmarge',
        definition: 'Der Prozentsatz des Umsatzes, der zum Gewinn wird',
        examples: [
          'Das Produkt hat eine hohe Gewinnmarge.',
          'Unternehmen streben danach, ihre Gewinnmargen zu erhöhen.'
        ],
        language: 'de'
      },
      {
        word: 'Margen de Beneficio',
        definition: 'El porcentaje de ingresos que se convierte en beneficio',
        examples: [
          'El producto tiene un alto margen de beneficio.',
          'Las empresas buscan aumentar sus márgenes de beneficio.'
        ],
        language: 'es'
      },
      {
        word: 'Market Share',
        definition: 'The percentage of total sales in an industry',
        examples: [
          'The company increased its market share.',
          'Market share is a key indicator of competitive position.'
        ],
        language: 'en'
      },
      {
        word: 'Marktanteil',
        definition: 'Der Prozentsatz des Gesamtumsatzes in einer Branche',
        examples: [
          'Das Unternehmen erhöhte seinen Marktanteil.',
          'Der Marktanteil ist ein wichtiger Indikator für die Wettbewerbsposition.'
        ],
        language: 'de'
      },
      {
        word: 'Cuota de Mercado',
        definition: 'El porcentaje de ventas totales en una industria',
        examples: [
          'La empresa aumentó su cuota de mercado.',
          'La cuota de mercado es un indicador clave de la posición competitiva.'
        ],
        language: 'es'
      },
      {
        word: 'Stakeholder',
        definition: 'A person or group with an interest in a business',
        examples: [
          'The project has multiple stakeholders.',
          'Stakeholder engagement is crucial for success.'
        ],
        language: 'en'
      },
      {
        word: 'Stakeholder',
        definition: 'Eine Person oder Gruppe mit Interesse an einem Unternehmen',
        examples: [
          'Das Projekt hat mehrere Stakeholder.',
          'Das Engagement der Stakeholder ist entscheidend für den Erfolg.'
        ],
        language: 'de'
      },
      {
        word: 'Interesado',
        definition: 'Una persona o grupo con interés en un negocio',
        examples: [
          'El proyecto tiene múltiples interesados.',
          'La participación de los interesados es crucial para el éxito.'
        ],
        language: 'es'
      },
      {
        word: 'Supply Chain',
        definition: 'The network of organizations involved in producing and delivering a product',
        examples: [
          'The company optimized its supply chain.',
          'Supply chain disruptions affected production.'
        ],
        language: 'en'
      },
      {
        word: 'Lieferkette',
        definition: 'Das Netzwerk von Organisationen, die an der Produktion und Lieferung eines Produkts beteiligt sind',
        examples: [
          'Das Unternehmen optimierte seine Lieferkette.',
          'Störungen in der Lieferkette beeinflussten die Produktion.'
        ],
        language: 'de'
      },
      {
        word: 'Cadena de Suministro',
        definition: 'La red de organizaciones involucradas en la producción y entrega de un producto',
        examples: [
          'La empresa optimizó su cadena de suministro.',
          'Las interrupciones en la cadena de suministro afectaron la producción.'
        ],
        language: 'es'
      },
      {
        word: 'Brand Equity',
        definition: 'The value of a brand based on customer perception',
        examples: [
          'The company has strong brand equity.',
          'Brand equity contributes to customer loyalty.'
        ],
        language: 'en'
      },
      {
        word: 'Markenwert',
        definition: 'Der Wert einer Marke basierend auf der Wahrnehmung der Kunden',
        examples: [
          'Das Unternehmen hat einen starken Markenwert.',
          'Der Markenwert trägt zur Kundenbindung bei.'
        ],
        language: 'de'
      },
      {
        word: 'Valor de Marca',
        definition: 'El valor de una marca basado en la percepción del cliente',
        examples: [
          'La empresa tiene un fuerte valor de marca.',
          'El valor de marca contribuye a la lealtad del cliente.'
        ],
        language: 'es'
      },
      {
        word: 'Cash Flow',
        definition: 'The movement of money in and out of a business',
        examples: [
          'The company maintains positive cash flow.',
          'Cash flow management is essential for operations.'
        ],
        language: 'en'
      },
      {
        word: 'Cashflow',
        definition: 'Die Bewegung von Geld in und aus einem Unternehmen',
        examples: [
          'Das Unternehmen hält einen positiven Cashflow aufrecht.',
          'Das Cashflow-Management ist entscheidend für den Betrieb.'
        ],
        language: 'de'
      },
      {
        word: 'Flujo de Caja',
        definition: 'El movimiento de dinero dentro y fuera de un negocio',
        examples: [
          'La empresa mantiene un flujo de caja positivo.',
          'La gestión del flujo de caja es esencial para las operaciones.'
        ],
        language: 'es'
      },
      {
        word: 'Market Analysis',
        definition: 'The study of market conditions and trends',
        examples: [
          'The team conducted a thorough market analysis.',
          'Market analysis guides strategic decisions.'
        ],
        language: 'en'
      },
      {
        word: 'Marktanalyse',
        definition: 'Die Untersuchung von Marktbedingungen und Trends',
        examples: [
          'Das Team führte eine gründliche Marktanalyse durch.',
          'Die Marktanalyse leitet strategische Entscheidungen.'
        ],
        language: 'de'
      },
      {
        word: 'Análisis de Mercado',
        definition: 'El estudio de las condiciones y tendencias del mercado',
        examples: [
          'El equipo realizó un análisis de mercado exhaustivo.',
          'El análisis de mercado guía las decisiones estratégicas.'
        ],
        language: 'es'
      }
    ]
  },
  {
    name: 'Science',
    description: 'Terms related to scientific research and discovery',
    vocabularies: [
      {
        word: 'Hypothesis',
        definition: 'A proposed explanation for a phenomenon',
        examples: [
          'The scientist developed a hypothesis about the reaction.',
          'The hypothesis was tested through experiments.'
        ],
        language: 'en'
      },
      {
        word: 'Hypothese',
        definition: 'Eine vorgeschlagene Erklärung für ein Phänomen',
        examples: [
          'Der Wissenschaftler entwickelte eine Hypothese über die Reaktion.',
          'Die Hypothese wurde durch Experimente getestet.'
        ],
        language: 'de'
      },
      {
        word: 'Hipótesis',
        definition: 'Una explicación propuesta para un fenómeno',
        examples: [
          'El científico desarrolló una hipótesis sobre la reacción.',
          'La hipótesis fue probada a través de experimentos.'
        ],
        language: 'es'
      },
      {
        word: 'Experiment',
        definition: 'A scientific procedure to test a hypothesis',
        examples: [
          'The experiment confirmed the theory.',
          'Careful controls were used in the experiment.'
        ],
        language: 'en'
      },
      {
        word: 'Experiment',
        definition: 'Ein wissenschaftliches Verfahren zur Überprüfung einer Hypothese',
        examples: [
          'Das Experiment bestätigte die Theorie.',
          'Im Experiment wurden sorgfältige Kontrollen verwendet.'
        ],
        language: 'de'
      },
      {
        word: 'Experimento',
        definition: 'Un procedimiento científico para probar una hipótesis',
        examples: [
          'El experimento confirmó la teoría.',
          'Se utilizaron controles cuidadosos en el experimento.'
        ],
        language: 'es'
      },
      {
        word: 'Theory',
        definition: 'A well-substantiated explanation of aspects of the natural world',
        examples: [
          'The theory of evolution explains species diversity.',
          'Scientific theories are supported by evidence.'
        ],
        language: 'en'
      },
      {
        word: 'Theorie',
        definition: 'Eine gut begründete Erklärung von Aspekten der natürlichen Welt',
        examples: [
          'Die Evolutionstheorie erklärt die Artenvielfalt.',
          'Wissenschaftliche Theorien werden durch Beweise gestützt.'
        ],
        language: 'de'
      },
      {
        word: 'Teoría',
        definition: 'Una explicación bien fundamentada de aspectos del mundo natural',
        examples: [
          'La teoría de la evolución explica la diversidad de especies.',
          'Las teorías científicas están respaldadas por evidencia.'
        ],
        language: 'es'
      },
      {
        word: 'Data',
        definition: 'Facts and statistics collected for analysis',
        examples: [
          'The research generated valuable data.',
          'Data analysis revealed significant patterns.'
        ],
        language: 'en'
      },
      {
        word: 'Daten',
        definition: 'Fakten und Statistiken, die für die Analyse gesammelt wurden',
        examples: [
          'Die Forschung generierte wertvolle Daten.',
          'Die Datenanalyse zeigte signifikante Muster.'
        ],
        language: 'de'
      },
      {
        word: 'Datos',
        definition: 'Hechos y estadísticas recopilados para análisis',
        examples: [
          'La investigación generó datos valiosos.',
          'El análisis de datos reveló patrones significativos.'
        ],
        language: 'es'
      },
      {
        word: 'Variable',
        definition: 'A factor that can change in an experiment',
        examples: [
          'The study controlled for multiple variables.',
          'Independent variables affect the outcome.'
        ],
        language: 'en'
      },
      {
        word: 'Variable',
        definition: 'Ein Faktor, der sich in einem Experiment ändern kann',
        examples: [
          'Die Studie kontrollierte mehrere Variablen.',
          'Unabhängige Variablen beeinflussen das Ergebnis.'
        ],
        language: 'de'
      },
      {
        word: 'Variable',
        definition: 'Un factor que puede cambiar en un experimento',
        examples: [
          'El estudio controló múltiples variables.',
          'Las variables independientes afectan el resultado.'
        ],
        language: 'es'
      },
      {
        word: 'Observation',
        definition: 'The act of watching and recording phenomena',
        examples: [
          'Careful observation led to new discoveries.',
          'The observation was documented in detail.'
        ],
        language: 'en'
      },
      {
        word: 'Beobachtung',
        definition: 'Der Akt des Beobachtens und Aufzeichnens von Phänomenen',
        examples: [
          'Sorgfältige Beobachtung führte zu neuen Entdeckungen.',
          'Die Beobachtung wurde detailliert dokumentiert.'
        ],
        language: 'de'
      },
      {
        word: 'Observación',
        definition: 'El acto de observar y registrar fenómenos',
        examples: [
          'La observación cuidadosa llevó a nuevos descubrimientos.',
          'La observación fue documentada en detalle.'
        ],
        language: 'es'
      },
      {
        word: 'Analysis',
        definition: 'The process of examining data in detail',
        examples: [
          'The analysis revealed significant trends.',
          'Statistical analysis supported the findings.'
        ],
        language: 'en'
      },
      {
        word: 'Analyse',
        definition: 'Der Prozess der detaillierten Untersuchung von Daten',
        examples: [
          'Die Analyse zeigte signifikante Trends.',
          'Die statistische Analyse unterstützte die Ergebnisse.'
        ],
        language: 'de'
      },
      {
        word: 'Análisis',
        definition: 'El proceso de examinar datos en detalle',
        examples: [
          'El análisis reveló tendencias significativas.',
          'El análisis estadístico respaldó los hallazgos.'
        ],
        language: 'es'
      },
      {
        word: 'Research',
        definition: 'Systematic investigation to establish facts',
        examples: [
          'The research project lasted three years.',
          'Research methods were carefully chosen.'
        ],
        language: 'en'
      },
      {
        word: 'Forschung',
        definition: 'Systematische Untersuchung zur Feststellung von Fakten',
        examples: [
          'Das Forschungsprojekt dauerte drei Jahre.',
          'Die Forschungsmethoden wurden sorgfältig ausgewählt.'
        ],
        language: 'de'
      },
      {
        word: 'Investigación',
        definition: 'Investigación sistemática para establecer hechos',
        examples: [
          'El proyecto de investigación duró tres años.',
          'Los métodos de investigación fueron cuidadosamente elegidos.'
        ],
        language: 'es'
      },
      {
        word: 'Evidence',
        definition: 'Information indicating whether a belief is true',
        examples: [
          'The evidence supported the hypothesis.',
          'Multiple lines of evidence were considered.'
        ],
        language: 'en'
      },
      {
        word: 'Beweis',
        definition: 'Informationen, die anzeigen, ob eine Überzeugung wahr ist',
        examples: [
          'Der Beweis unterstützte die Hypothese.',
          'Mehrere Beweislinien wurden berücksichtigt.'
        ],
        language: 'de'
      },
      {
        word: 'Evidencia',
        definition: 'Información que indica si una creencia es verdadera',
        examples: [
          'La evidencia respaldó la hipótesis.',
          'Se consideraron múltiples líneas de evidencia.'
        ],
        language: 'es'
      },
      {
        word: 'Methodology',
        definition: 'The system of methods used in research',
        examples: [
          'The methodology was clearly documented.',
          'The study followed established methodology.'
        ],
        language: 'en'
      },
      {
        word: 'Methodik',
        definition: 'Das System der in der Forschung verwendeten Methoden',
        examples: [
          'Die Methodik wurde klar dokumentiert.',
          'Die Studie folgte der etablierten Methodik.'
        ],
        language: 'de'
      },
      {
        word: 'Metodología',
        definition: 'El sistema de métodos utilizados en la investigación',
        examples: [
          'La metodología fue claramente documentada.',
          'El estudio siguió la metodología establecida.'
        ],
        language: 'es'
      }
    ]
  }
]

async function main() {
  // Clear existing data
  await prisma.vocabulary.deleteMany()
  await prisma.domain.deleteMany()

  // Create domains and their vocabularies
  for (const domain of domains) {
    const createdDomain = await prisma.domain.create({
      data: {
        name: domain.name,
        description: domain.description,
        vocabularies: {
          create: domain.vocabularies
        }
      }
    })
    console.log(`Created domain: ${createdDomain.name}`)
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