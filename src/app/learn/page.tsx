"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import AddVocabulary from '@/components/add-vocabulary'
import AddDomain from '@/components/add-domain'

type Vocabulary = {
  id: string
  word: string
  definition: string
  examples: string[]
  domainId: string
}

type Domain = {
  id: string
  name: string
  description: string
  vocabularies: Vocabulary[]
}

export default function LearnPage() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [domains, setDomains] = useState<Domain[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [showAddVocabulary, setShowAddVocabulary] = useState(false)
  const [showAddDomain, setShowAddDomain] = useState(false)

  const fetchDomains = async () => {
    try {
      const response = await fetch('/api/vocabulary')
      if (!response.ok) {
        throw new Error('Failed to fetch vocabulary')
      }
      const data = await response.json()
      setDomains(data)
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDomains()
  }, [])

  const handleDomainSelect = (domainId: string) => {
    setSelectedDomain(domainId)
    setCurrentWordIndex(0)
    setShowAddVocabulary(false)
    setShowAddDomain(false)
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget
    const scrollPosition = container.scrollTop
    const cardHeight = container.clientHeight
    const newIndex = Math.round(scrollPosition / cardHeight)
    
    if (selectedDomain && newIndex !== currentWordIndex) {
      const domain = domains.find(d => d.id === selectedDomain)
      if (domain && newIndex >= 0 && newIndex < domain.vocabularies.length) {
        setCurrentWordIndex(newIndex)
      }
    }
  }

  const currentDomain = selectedDomain ? domains.find(d => d.id === selectedDomain) : null
  const currentVocabulary = currentDomain?.vocabularies[currentWordIndex]
  const totalWords = currentDomain?.vocabularies.length ?? 0

  if (isLoading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-[calc(100vh-12rem)]">
            <p className="text-gray-600">Loading vocabulary...</p>
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-[calc(100vh-12rem)]">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </main>
    )
  }

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

        <div className={`grid gap-8 transition-all duration-300 ${
          isSidebarVisible ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'
        }`}>
          {/* Domains Sidebar */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Domains</h2>
              <div className="flex gap-2">
                {isSidebarVisible && (
                  <button
                    onClick={() => setShowAddDomain(!showAddDomain)}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                    title={showAddDomain ? "Hide add domain" : "Add new domain"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      {showAddDomain ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12h-15"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      )}
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsSidebarVisible(!isSidebarVisible)
                    if (!isSidebarVisible) {
                      setShowAddDomain(false)
                    }
                  }}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                  title={isSidebarVisible ? "Hide domains" : "Show domains"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    {isSidebarVisible ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
            <div className={`transition-all duration-300 ${
              isSidebarVisible ? 'block' : 'hidden'
            }`}>
              {showAddDomain ? (
                <div className="mb-4">
                  <AddDomain onAdd={fetchDomains} />
                </div>
              ) : (
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
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className={`bg-white rounded-lg shadow-md overflow-hidden ${
            isSidebarVisible ? 'md:col-span-2' : 'md:col-span-1'
          }`}>
            {selectedDomain ? (
              <>
                {isSidebarVisible && (
                  <div className="p-4 border-b">
                    <button
                      onClick={() => setShowAddVocabulary(!showAddVocabulary)}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {showAddVocabulary ? 'Hide Add Vocabulary' : 'Add New Vocabulary'}
                    </button>
                  </div>
                )}

                {showAddVocabulary && isSidebarVisible ? (
                  <div className="p-4">
                    <AddVocabulary
                      domains={domains.map(d => ({ id: d.id, name: d.name }))}
                      onAdd={fetchDomains}
                    />
                  </div>
                ) : (
                  <div 
                    className="h-[calc(100vh-12rem)] overflow-y-auto snap-y snap-mandatory"
                    onScroll={handleScroll}
                  >
                    {currentDomain?.vocabularies.map((vocab, index) => (
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
                )}
              </>
            ) : (
              <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
                <p className="text-gray-600">Select a domain to view vocabulary</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 