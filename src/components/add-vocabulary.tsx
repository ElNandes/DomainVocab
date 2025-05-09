"use client"

import { useState } from 'react'

type DictionaryResponse = {
  word: string
  phonetic: string
  meanings: {
    partOfSpeech: string
    definitions: {
      definition: string
      example?: string
    }[]
  }[]
}

type AddVocabularyProps = {
  domains: {
    id: string
    name: string
  }[]
  onAdd: () => void
}

export default function AddVocabulary({ domains, onAdd }: AddVocabularyProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<DictionaryResponse | null>(null)
  const [selectedDomain, setSelectedDomain] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [customDefinition, setCustomDefinition] = useState('')
  const [customExamples, setCustomExamples] = useState<string[]>([''])

  const searchWord = async () => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    setError(null)
    try {
      // Try Free Dictionary API first
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(searchTerm)}`
      )
      
      if (!response.ok) {
        // If word not found, allow manual entry
        setSearchResults({
          word: searchTerm,
          phonetic: '',
          meanings: [{
            partOfSpeech: '',
            definitions: [{
              definition: '',
              example: ''
            }]
          }]
        })
        setCustomDefinition('')
        setCustomExamples([''])
        return
      }

      const data = await response.json()
      setSearchResults(data[0])
      // Pre-fill custom definition and examples
      setCustomDefinition(data[0].meanings[0].definitions[0].definition)
      setCustomExamples(
        data[0].meanings
          .flatMap((meaning: { definitions: { example?: string }[] }) => meaning.definitions)
          .filter((def: { example?: string }) => def.example)
          .map((def: { example: string }) => def.example)
          .slice(0, 2)
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch word definition')
      setSearchResults(null)
    } finally {
      setIsSearching(false)
    }
  }

  const addVocabulary = async () => {
    if (!searchResults || !selectedDomain) return

    try {
      const response = await fetch('/api/vocabulary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domainId: selectedDomain,
          word: searchResults.word,
          definition: customDefinition || searchResults.meanings[0].definitions[0].definition,
          examples: customExamples.filter(ex => ex.trim() !== ''),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add vocabulary')
      }

      // Reset form
      setSearchTerm('')
      setSearchResults(null)
      setSelectedDomain('')
      setCustomDefinition('')
      setCustomExamples([''])
      onAdd() // Notify parent to refresh vocabulary list
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add vocabulary')
    }
  }

  const addExampleField = () => {
    setCustomExamples([...customExamples, ''])
  }

  const updateExample = (index: number, value: string) => {
    const newExamples = [...customExamples]
    newExamples[index] = value
    setCustomExamples(newExamples)
  }

  const removeExample = (index: number) => {
    setCustomExamples(customExamples.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Vocabulary</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Word
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchWord()}
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter a word to search"
            />
            <button
              onClick={searchWord}
              disabled={isSearching}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        {searchResults && (
          <div className="space-y-4">
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
                Select Domain
              </label>
              <select
                id="domain"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a domain</option>
                {domains.map((domain) => (
                  <option key={domain.id} value={domain.id}>
                    {domain.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium text-lg mb-2">{searchResults.word}</h3>
              
              <div className="mb-4">
                <label htmlFor="definition" className="block text-sm font-medium text-gray-700 mb-1">
                  Definition
                </label>
                <textarea
                  id="definition"
                  value={customDefinition}
                  onChange={(e) => setCustomDefinition(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="Enter or edit the definition"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Examples
                </label>
                {customExamples.map((example, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={example}
                      onChange={(e) => updateExample(index, e.target.value)}
                      className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder={`Example ${index + 1}`}
                    />
                    {customExamples.length > 1 && (
                      <button
                        onClick={() => removeExample(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addExampleField}
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  + Add Example
                </button>
              </div>
            </div>

            <button
              onClick={addVocabulary}
              disabled={!selectedDomain || !customDefinition.trim()}
              className="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              Add to Vocabulary
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 