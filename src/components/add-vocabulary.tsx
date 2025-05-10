"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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

type Domain = {
  id: string
  name: string
}

type AddVocabularyProps = {
  domains: Domain[]
  onAdd: () => void
  currentLanguage: string
}

const schema = z.object({
  domainId: z.string().min(1, 'Please select a domain'),
  word: z.string().min(1, 'Word is required'),
  definition: z.string().min(1, 'Definition is required'),
  examples: z.array(z.string()).optional(),
})

type FormData = z.infer<typeof schema>

export default function AddVocabulary({ domains, onAdd, currentLanguage }: AddVocabularyProps) {
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const wordValue = watch('word')

  const searchWord = async (word: string) => {
    if (!word.trim()) return
    setIsSearching(true)
    setError(null)
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      if (!response.ok) {
        throw new Error('Word not found')
      }
      const data = await response.json()
      setSearchResults(data)
    } catch (err) {
      setError('Word not found in dictionary. Please enter the definition manually.')
      setSearchResults([])
    }
    setIsSearching(false)
  }

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Submitting form data:', data)
      const response = await fetch('/api/vocabulary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          language: currentLanguage,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Server error:', errorData)
        throw new Error(errorData.error || 'Failed to add vocabulary')
      }

      const result = await response.json()
      console.log('Successfully added vocabulary:', result)

      onAdd()
      setValue('word', '')
      setValue('definition', '')
      setValue('examples', [])
      setSearchResults([])
    } catch (err) {
      console.error('Error submitting form:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="domainId" className="block text-sm font-medium text-gray-700">
          Domain
        </label>
        <select
          id="domainId"
          {...register('domainId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Select a domain</option>
          {domains.map((domain) => (
            <option key={domain.id} value={domain.id}>
              {domain.name}
            </option>
          ))}
        </select>
        {errors.domainId && (
          <p className="mt-1 text-sm text-red-600">{errors.domainId.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="word" className="block text-sm font-medium text-gray-700">
          Word
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="word"
            {...register('word')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Enter a word"
          />
          <button
            type="button"
            onClick={() => searchWord(wordValue)}
            disabled={isSearching}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
        {errors.word && (
          <p className="mt-1 text-sm text-red-600">{errors.word.message}</p>
        )}
      </div>

      {searchResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">Search Results</h3>
          <div className="mt-2 space-y-4">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="p-4 border rounded-md cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  setValue('word', result.word)
                  setValue('definition', result.meanings[0].definitions[0].definition)
                  setValue('examples', [result.meanings[0].definitions[0].example].filter(Boolean))
                  setSearchResults([])
                }}
              >
                <h4 className="font-medium">{result.word}</h4>
                <p className="text-sm text-gray-600">{result.meanings[0].definitions[0].definition}</p>
                {result.meanings[0].definitions[0].example && (
                  <p className="text-sm text-gray-500 mt-1">
                    Example: {result.meanings[0].definitions[0].example}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="definition" className="block text-sm font-medium text-gray-700">
          Definition
        </label>
        <textarea
          id="definition"
          {...register('definition')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Enter the definition"
        />
        {errors.definition && (
          <p className="mt-1 text-sm text-red-600">{errors.definition.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="examples" className="block text-sm font-medium text-gray-700">
          Examples (one per line)
        </label>
        <textarea
          id="examples"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Enter examples"
          onChange={(e) => {
            const examples = e.target.value.split('\n').filter(Boolean)
            setValue('examples', examples)
          }}
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {isSubmitting ? 'Adding...' : 'Add Vocabulary'}
        </button>
      </div>
    </form>
  )
} 