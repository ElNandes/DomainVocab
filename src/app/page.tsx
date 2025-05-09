"use client"

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Domain Vocabulary
          </h1>
          <p className="text-gray-600 mb-8">
            Learn vocabulary specific to different domains
          </p>
        </div>
        <div className="space-y-4">
          <Link
            href="/learn"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </main>
  )
} 