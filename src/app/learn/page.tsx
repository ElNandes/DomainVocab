"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function LearnPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)

  // Temporary mock data
  const domains = [
    { id: '1', name: 'Technology', description: 'Tech-related vocabulary' },
    { id: '2', name: 'Business', description: 'Business and finance terms' },
    { id: '3', name: 'Science', description: 'Scientific terminology' },
  ]

  const vocabularies = [
    { id: '1', word: 'Algorithm', definition: 'A set of rules or instructions given to a computer to solve a problem', examples: ['The search algorithm quickly found the relevant results.'] },
    { id: '2', word: 'API', definition: 'Application Programming Interface - a set of rules that allows programs to talk to each other', examples: ['The app uses the Twitter API to fetch tweets.'] },
  ]

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
                  onClick={() => setSelectedDomain(domain.id)}
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

          {/* Vocabulary List */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Vocabulary</h2>
              {selectedDomain ? (
                <div className="space-y-4">
                  {vocabularies.map((vocab) => (
                    <div key={vocab.id} className="border-b pb-4 last:border-b-0">
                      <h3 className="text-lg font-medium">{vocab.word}</h3>
                      <p className="text-gray-600 mt-1">{vocab.definition}</p>
                      {vocab.examples.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Examples:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {vocab.examples.map((example, index) => (
                              <li key={index}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
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