import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface VocabularyCardProps {
  word: string;
  definition: string;
  examples: string[];
  domain: string;
  language: string;
}

export function VocabularyCard({ word, definition, examples, domain, language }: VocabularyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingType, setSpeakingType] = useState<'word' | 'definition' | 'example' | null>(null);
  const [speakingExampleIndex, setSpeakingExampleIndex] = useState<number | null>(null);

  // Map domain names to their English equivalents for consistent image paths
  const domainMap: { [key: string]: string } = {
    'technologie': 'technology',
    'technología': 'technology',
    'geschäft': 'business',
    'unternehmen': 'business',
    'negocio': 'business',
    'wissenschaft': 'science',
    'ciencia': 'science'
  };

  // Get the English domain name for consistent image paths
  const englishDomain = domainMap[domain.toLowerCase()] || domain.toLowerCase();
  const images = Array.from({ length: 5 }, (_, i) => `/images/${englishDomain}/${word.toLowerCase()}/image${i + 1}.png`);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handleSpeak = (text: string, type: 'word' | 'definition' | 'example', exampleIndex?: number) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingType(null);
      setSpeakingExampleIndex(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.lang = language;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingType(type);
      if (exampleIndex !== undefined) {
        setSpeakingExampleIndex(exampleIndex);
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingType(null);
      setSpeakingExampleIndex(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingType(null);
      setSpeakingExampleIndex(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative w-[540px] h-[960px] rounded-lg overflow-hidden shadow-lg">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={`${word} background ${index + 1}`}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-3xl font-bold text-white">{word}</h3>
            <button
              onClick={() => handleSpeak(word, 'word')}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              title={isSpeaking && speakingType === 'word' ? 'Stop reading' : 'Read word'}
            >
              {isSpeaking && speakingType === 'word' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex items-start gap-2">
            <p className="text-white text-xl leading-relaxed flex-1">{definition}</p>
            <button
              onClick={() => handleSpeak(definition, 'definition')}
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors flex-shrink-0"
              title={isSpeaking && speakingType === 'definition' ? 'Stop reading' : 'Read definition'}
            >
              {isSpeaking && speakingType === 'definition' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {examples.length > 0 && (
          <div className="mt-6">
            <h4 className="text-white font-semibold text-lg mb-3">Examples:</h4>
            <ul className="list-disc list-inside text-white space-y-2">
              {examples.map((example, index) => (
                <li key={index} className="text-base flex items-start gap-2">
                  <span className="flex-1">{example}</span>
                  <button
                    onClick={() => handleSpeak(example, 'example', index)}
                    className="p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors flex-shrink-0"
                    title={isSpeaking && speakingType === 'example' && speakingExampleIndex === index ? 'Stop reading' : 'Read example'}
                  >
                    {isSpeaking && speakingType === 'example' && speakingExampleIndex === index ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <span className="text-white text-sm uppercase tracking-wider">{domain}</span>
          <span className="text-white text-sm uppercase tracking-wider">{language}</span>
        </div>
      </div>
    </div>
  );
} 