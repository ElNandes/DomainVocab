"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { getTranslation } from '@/lib/translations'

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

const formSchema = z.object({
  domainId: z.string().min(1, 'Please select a domain'),
  word: z.string().min(1, 'Word is required'),
  definition: z.string().min(1, 'Definition is required'),
  examples: z.array(z.string()).min(1, 'At least one example is required'),
})

type FormData = z.infer<typeof formSchema>

export default function AddVocabulary({ domains, onAdd, currentLanguage }: AddVocabularyProps) {
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Array<{ word: string; definition: string }>>([])
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      examples: [''],
    },
  })

  const examples = watch('examples')

  const handleExampleChange = (index: number, value: string) => {
    const newExamples = [...examples]
    newExamples[index] = value
    setValue('examples', newExamples)
  }

  const addExample = () => {
    setValue('examples', [...examples, ''])
  }

  const removeExample = (index: number) => {
    setValue('examples', examples.filter((_, i) => i !== index))
  }

  const searchWord = async (searchTerm: string) => {
    if (!searchTerm?.trim()) return

    setIsSearching(true)
    setError(null)
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm.trim()}`)
      if (!response.ok) {
        throw new Error('Word not found')
      }
      const data = await response.json()
      setSearchResults(data.map((entry: any) => ({
        word: entry.word,
        definition: entry.meanings[0]?.definitions[0]?.definition || '',
      })))
    } catch (error) {
      setError('Failed to fetch definition. Please enter manually.')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Get translations for all languages
      const translations = await Promise.all(
        ['en', 'de', 'es'].map(async (lang) => {
          if (lang === 'en') {
            return {
              language: lang,
              word: data.word,
              definition: data.definition,
              examples: data.examples,
              domainId: data.domainId,
            }
          }

          const [translatedWord, translatedDef, translatedExamples] = await Promise.all([
            getTranslation(data.word, lang),
            getTranslation(data.definition, lang),
            Promise.all(data.examples.map(example => getTranslation(example, lang))),
          ])

          return {
            language: lang,
            word: translatedWord,
            definition: translatedDef,
            examples: translatedExamples,
            domainId: data.domainId,
          }
        })
      )

      const response = await fetch('/api/vocabulary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ translations }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add vocabulary')
      }

      onAdd()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add vocabulary')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
          Domain
        </label>
        <select
          id="domain"
          {...register('domainId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={() => searchWord(watch('word'))}
            disabled={isSearching || !watch('word')?.trim()}
            className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
        {errors.word && (
          <p className="mt-1 text-sm text-red-600">{errors.word.message}</p>
        )}
      </div>

      {searchResults.length > 0 && (
        <div className="rounded-md bg-gray-50 p-4">
          <h4 className="text-sm font-medium text-gray-900">Search Results</h4>
          <div className="mt-2 space-y-2">
            {searchResults.map((result, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setValue('word', result.word)
                  setValue('definition', result.definition)
                  setSearchResults([])
                }}
                className="block w-full text-left rounded-md p-2 hover:bg-gray-100"
              >
                <div className="font-medium">{result.word}</div>
                <div className="text-sm text-gray-500">{result.definition}</div>
              </button>
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
          rows={3}
          {...register('definition')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.definition && (
          <p className="mt-1 text-sm text-red-600">{errors.definition.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Examples</label>
        <div className="mt-2 space-y-2">
          {examples.map((example, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={example}
                onChange={(e) => handleExampleChange(index, e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {examples.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExample(index)}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addExample}
            className="mt-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Example
          </button>
        </div>
        {errors.examples && (
          <p className="mt-1 text-sm text-red-600">{errors.examples.message}</p>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Adding...' : 'Add Vocabulary'}
        </button>
      </div>
    </form>
  )
} 