"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AddVocabulary from '@/components/add-vocabulary'
import AddDomain from '@/components/add-domain'
import { LanguageSettings } from '@/components/language-settings'
import { getTranslation } from '@/lib/translations'
import { VocabularyCard } from '@/components/vocabulary-card'

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
  vocabulary: Array<{
    id: string
    word: string
    definition: string
    examples: string[]
  }>
}

type Language = 'en' | 'de' | 'es'

export default function LearnPage() {
  const router = useRouter()
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [domains, setDomains] = useState<Domain[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [showAddVocabulary, setShowAddVocabulary] = useState(false)
  const [showAddDomain, setShowAddDomain] = useState(false)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'de' | 'es'
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (lang: 'en' | 'de' | 'es') => {
    if (speakingId) {
      window.speechSynthesis.cancel()
      setSpeakingId(null)
    }
    setCurrentLanguage(lang)
    localStorage.setItem('language', lang)
    setIsDropdownOpen(false)
  }

  const fetchDomains = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/vocabulary?language=${currentLanguage}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Fetched domains:', data)
      setDomains(data)
    } catch (err) {
      console.error('Error fetching vocabulary:', err)
      setError(getTranslation('error.fetch', currentLanguage))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDomains()
  }, [currentLanguage])

  const handleDomainSelect = (domainId: string) => {
    const domain = domains.find(d => d.id === domainId)
    console.log('Selected domain:', domain)
    if (domain) {
      setSelectedDomain(domain)
      setCurrentWordIndex(0)
      setShowAddVocabulary(false)
      setShowAddDomain(false)
    }
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget
    const scrollPosition = container.scrollTop
    const cardHeight = 960 // Updated height of each card
    const newIndex = Math.round(scrollPosition / cardHeight)
    
    if (selectedDomain && newIndex >= 0 && newIndex < selectedDomain.vocabulary.length) {
      setCurrentWordIndex(newIndex)
    }
  }

  const handleSpeak = (text: string, id: string) => {
    if (speakingId === id) {
      window.speechSynthesis.cancel()
      setSpeakingId(null)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.lang = currentLanguage

    utterance.onstart = () => setSpeakingId(id)
    utterance.onend = () => setSpeakingId(null)
    utterance.onerror = () => setSpeakingId(null)

    window.speechSynthesis.speak(utterance)
  }

  const currentVocabulary = selectedDomain?.vocabulary?.[currentWordIndex] ?? null
  const totalWords = selectedDomain?.vocabulary?.length ?? 0

  const handleBackToHome = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push('/')
  }

  const handleNextWord = () => {
    if (selectedDomain && currentWordIndex < selectedDomain.vocabulary.length - 1) {
      setCurrentWordIndex(prev => prev + 1)
    }
  }

  const handlePreviousWord = () => {
    if (selectedDomain && currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-[calc(100vh-12rem)]">
            <p className="text-gray-600">{getTranslation('loading', currentLanguage)}</p>
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
            <p className="text-red-600">{getTranslation('error', currentLanguage)}: {error}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{getTranslation('learning-dashboard', currentLanguage)}</h1>
          <div className="flex items-center gap-4">
            <LanguageSettings
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
            <Link 
              href="/"
              className="text-primary-600 hover:text-primary-700"
            >
              {getTranslation('back-to-home', currentLanguage)}
            </Link>
          </div>
        </div>

        <div className={`grid gap-8 transition-all duration-300 ${
          isSidebarVisible ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'
        }`}>
          {/* Domains Sidebar */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{getTranslation('domains', currentLanguage)}</h2>
              <div className="flex gap-2">
                {isSidebarVisible && (
                  <button
                    onClick={() => setShowAddDomain(!showAddDomain)}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                    title={showAddDomain ? getTranslation('hide-domains', currentLanguage) : getTranslation('add-domain', currentLanguage)}
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
                  title={isSidebarVisible ? getTranslation('hide-domains', currentLanguage) : getTranslation('show-domains', currentLanguage)}
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
                        selectedDomain?.id === domain.id
                          ? 'bg-primary-100 text-primary-900'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <h3 className="font-medium">{domain.name}</h3>
                      <p className="text-sm text-gray-500">
                        {domain.vocabulary?.length ?? 0} terms
                      </p>
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
                      {showAddVocabulary ? getTranslation('hide-add-vocabulary', currentLanguage) : getTranslation('add-vocabulary', currentLanguage)}
                    </button>
                  </div>
                )}

                {showAddVocabulary && isSidebarVisible ? (
                  <div className="p-4">
                    <AddVocabulary
                      domains={domains.map(d => ({ id: d.id, name: d.name }))}
                      onAdd={fetchDomains}
                      currentLanguage={currentLanguage}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col h-[calc(100vh-12rem)]">
                    {selectedDomain?.vocabulary?.length === 0 ? (
                      <div className="flex-1 flex items-center justify-center">
                        <p className="text-gray-500">No vocabulary terms found. Add some terms to get started!</p>
                      </div>
                    ) : (
                      <div 
                        ref={containerRef}
                        className="flex-1 overflow-y-auto snap-y snap-mandatory"
                        onScroll={handleScroll}
                      >
                        <div className="flex flex-col items-center space-y-12 py-12">
                          {selectedDomain?.vocabulary?.map((vocab, index) => (
                            <div key={vocab.id} className="snap-start">
                              <VocabularyCard
                                word={vocab.word}
                                definition={vocab.definition}
                                examples={vocab.examples}
                                domain={selectedDomain.name.toLowerCase()}
                                language={currentLanguage}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
                <p className="text-gray-600">{getTranslation('select-domain', currentLanguage)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 