"use client"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to DomainVocab
        </h1>
        <p className="text-center text-lg mb-4">
          Your personal assistant for mastering domain-specific vocabulary
        </p>
        <div className="mt-8 flex justify-center">
          <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            Start Learning
          </button>
        </div>
      </div>
    </main>
  )
} 