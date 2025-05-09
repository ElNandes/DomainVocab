"use client"

import { useState } from 'react'
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

export default function LearnPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  // Temporary mock data
  const domains: Domain[] = [
    { id: '1', name: 'Technology', description: 'Tech-related vocabulary' },
    { id: '2', name: 'Business', description: 'Business and finance terms' },
    { id: '3', name: 'Science', description: 'Scientific terminology' },
  ]

  const vocabularies: Vocabularies = {
    '1': [ // Technology
      { 
        id: '1', 
        word: 'Algorithm', 
        definition: 'A set of rules or instructions given to a computer to solve a problem', 
        examples: ['The search algorithm quickly found the relevant results.', 'Machine learning algorithms can predict user behavior.'] 
      },
      { 
        id: '2', 
        word: 'API', 
        definition: 'Application Programming Interface - a set of rules that allows programs to talk to each other', 
        examples: ['The app uses the Twitter API to fetch tweets.', 'Developers use APIs to integrate different services.'] 
      },
      { 
        id: '3', 
        word: 'Cloud Computing', 
        definition: 'The delivery of computing services over the internet', 
        examples: ['Many companies use cloud computing to store their data.', 'Cloud computing allows for flexible resource allocation.'] 
      },
      { 
        id: '4', 
        word: 'Database', 
        definition: 'An organized collection of structured information or data', 
        examples: ['The company database stores customer information.', 'SQL databases are commonly used for relational data.'] 
      },
      { 
        id: '5', 
        word: 'Encryption', 
        definition: 'The process of converting information into a secure code', 
        examples: ['Data encryption protects sensitive information.', 'End-to-end encryption ensures secure communication.'] 
      }
    ],
    '2': [ // Business
      { 
        id: '6', 
        word: 'ROI', 
        definition: 'Return on Investment - a measure of the profitability of an investment', 
        examples: ['The marketing campaign showed a positive ROI.', 'Investors analyze ROI before making decisions.'] 
      },
      { 
        id: '7', 
        word: 'KPI', 
        definition: 'Key Performance Indicator - a measurable value that demonstrates effectiveness', 
        examples: ['Sales growth is a key KPI for the business.', 'The team tracks multiple KPIs to measure success.'] 
      }
    ],
    '3': [ // Science
      { 
        id: '8', 
        word: 'Hypothesis', 
        definition: 'A proposed explanation for a phenomenon', 
        examples: ['The scientist developed a hypothesis about climate change.', 'The experiment was designed to test the hypothesis.'] 
      },
      { 
        id: '9', 
        word: 'Molecule', 
        definition: 'The smallest unit of a chemical compound', 
        examples: ['Water molecules consist of two hydrogen atoms and one oxygen atom.', 'The structure of the molecule was analyzed.'] 
      }
    ]
  }

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomain(domainId)
    setCurrentWordIndex(0)
  }

  const handleNext = () => {
    if (selectedDomain && currentWordIndex < vocabularies[selectedDomain].length - 1) {
      setCurrentWordIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1)
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
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Vocabulary</h2>
              {selectedDomain && currentVocabulary ? (
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <h3 className="text-2xl font-bold text-primary-700">{currentVocabulary.word}</h3>
                    <p className="text-gray-600 mt-2 text-lg">{currentVocabulary.definition}</p>
                    {currentVocabulary.examples.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700">Examples:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
                          {currentVocabulary.examples.map((example: string, index: number) => (
                            <li key={index} className="mb-1">{example}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-4">
                    <button
                      onClick={handlePrevious}
                      disabled={currentWordIndex === 0}
                      className={`px-4 py-2 rounded-md ${
                        currentWordIndex === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-gray-600">
                      {currentWordIndex + 1} of {totalWords}
                    </span>
                    <button
                      onClick={handleNext}
                      disabled={currentWordIndex === totalWords - 1}
                      className={`px-4 py-2 rounded-md ${
                        currentWordIndex === totalWords - 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Select a domain to view vocabulary</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 