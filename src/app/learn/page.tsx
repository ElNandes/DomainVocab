"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Vocabulary = {
  id: string
  word: string
  definition: string
  examples: string[]
}

type Domain = {
  id: string
  name: string
  description: string
}

type Vocabularies = {
  [key: string]: Vocabulary[]
}

// Generate dummy vocabulary entries
const generateDummyVocabularies = (): Vocabularies => {
  const techTerms = [
    'Algorithm', 'API', 'Cloud Computing', 'Database', 'Encryption',
    'Firewall', 'Gateway', 'Hash', 'Interface', 'JavaScript',
    'Kernel', 'Latency', 'Middleware', 'Network', 'Operating System',
    'Protocol', 'Query', 'Router', 'Server', 'Token',
    'URL', 'Virtual Machine', 'WebSocket', 'XML', 'YAML',
    'Zero-day', 'Backend', 'Cache', 'DNS', 'Endpoint',
    'Framework', 'GraphQL', 'Hosting', 'IP Address', 'JSON',
    'Key-value Store', 'Load Balancer', 'Microservice', 'Node.js', 'OAuth',
    'Proxy', 'Queue', 'REST', 'SSL', 'TypeScript'
  ]

  const businessTerms = [
    'ROI', 'KPI', 'B2B', 'B2C', 'CRM',
    'ERP', 'SaaS', 'PaaS', 'IaaS', 'MVP',
    'SLA', 'SOW', 'RFP', 'RFQ', 'NDA',
    'IPO', 'M&A', 'P&L', 'EBITDA', 'ROE',
    'ROA', 'DCF', 'NPV', 'IRR', 'WACC',
    'CAPEX', 'OPEX', 'COGS', 'EBIT', 'EPS',
    'P/E Ratio', 'D/E Ratio', 'Quick Ratio', 'Current Ratio', 'Working Capital',
    'Cash Flow', 'Balance Sheet', 'Income Statement', 'Cash Flow Statement', 'Trial Balance',
    'General Ledger', 'Chart of Accounts', 'Double Entry', 'Accrual', 'Depreciation'
  ]

  const scienceTerms = [
    'Hypothesis', 'Molecule', 'Atom', 'Element', 'Compound',
    'Reaction', 'Catalyst', 'Enzyme', 'Protein', 'DNA',
    'RNA', 'Cell', 'Tissue', 'Organ', 'System',
    'Ecosystem', 'Species', 'Genus', 'Family', 'Order',
    'Class', 'Phylum', 'Kingdom', 'Domain', 'Evolution',
    'Mutation', 'Gene', 'Chromosome', 'Genome', 'Phenotype',
    'Genotype', 'Allele', 'Dominant', 'Recessive', 'Heterozygous',
    'Homozygous', 'Mitosis', 'Meiosis', 'Gamete', 'Zygote',
    'Embryo', 'Fetus', 'Organism', 'Population', 'Community'
  ]

  const createVocabularyEntry = (word: string, domain: string): Vocabulary => ({
    id: `${domain}-${word}`,
    word,
    definition: `Definition of ${word} in ${domain} context. This is a detailed explanation of the term and its significance.`,
    examples: [
      `Example 1: Using ${word} in a practical scenario.`,
      `Example 2: Another application of ${word} in real-world context.`
    ]
  })

  return {
    '1': techTerms.map(term => createVocabularyEntry(term, 'Technology')),
    '2': businessTerms.map(term => createVocabularyEntry(term, 'Business')),
    '3': scienceTerms.map(term => createVocabularyEntry(term, 'Science'))
  }
}

export default function LearnPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [vocabularies, setVocabularies] = useState<Vocabularies>({})

  // Temporary mock data
  const domains: Domain[] = [
    { id: '1', name: 'Technology', description: 'Tech-related vocabulary' },
    { id: '2', name: 'Business', description: 'Business and finance terms' },
    { id: '3', name: 'Science', description: 'Scientific terminology' },
  ]

  useEffect(() => {
    setVocabularies(generateDummyVocabularies())
  }, [])

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomain(domainId)
    setCurrentWordIndex(0)
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget
    const scrollPosition = container.scrollTop
    const cardHeight = container.clientHeight
    const newIndex = Math.round(scrollPosition / cardHeight)
    
    if (selectedDomain && newIndex !== currentWordIndex && newIndex >= 0 && newIndex < vocabularies[selectedDomain].length) {
      setCurrentWordIndex(newIndex)
    }
  }

  const currentVocabulary = selectedDomain ? vocabularies[selectedDomain][currentWordIndex] : null
  const totalWords = selectedDomain ? vocabularies[selectedDomain].length : 0

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Learning Dashboard</h1>
          <Link 
            href="/"
            className="text-primary-600 hover:text-primary-700"
          >
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Domains Sidebar */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Domains</h2>
            <div className="space-y-2">
              {domains.map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => handleDomainSelect(domain.id)}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedDomain === domain.id
                      ? 'bg-primary-100 text-primary-900'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <h3 className="font-medium">{domain.name}</h3>
                  <p className="text-sm text-gray-600">{domain.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Vocabulary Display */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {selectedDomain && currentVocabulary ? (
                <div 
                  className="h-[calc(100vh-12rem)] overflow-y-auto snap-y snap-mandatory"
                  onScroll={handleScroll}
                >
                  {vocabularies[selectedDomain].map((vocab, index) => (
                    <div 
                      key={vocab.id}
                      className="h-[calc(100vh-12rem)] snap-start flex items-center justify-center p-8"
                    >
                      <div className="w-full max-w-md aspect-[9/16] bg-white rounded-xl shadow-lg p-8 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-3xl font-bold text-primary-700 mb-4">{vocab.word}</h3>
                          <p className="text-gray-600 text-lg mb-6">{vocab.definition}</p>
                          {vocab.examples.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Examples:</p>
                              <ul className="space-y-2">
                                {vocab.examples.map((example: string, index: number) => (
                                  <li key={index} className="text-gray-600">{example}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div className="text-center text-sm text-gray-500 mt-4">
                          {index + 1} of {totalWords}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
                  <p className="text-gray-600">Select a domain to view vocabulary</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 