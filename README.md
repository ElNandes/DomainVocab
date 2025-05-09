# DomainVocab

DomainVocab is a modern web application designed to help users learn and master domain-specific vocabulary efficiently. Whether you're learning technical terms, industry jargon, or specialized vocabulary, DomainVocab provides an intuitive platform for vocabulary acquisition and retention.

## Features

- Domain-specific vocabulary learning
- Spaced repetition system
- Progress tracking
- Customizable learning paths
- Interactive practice exercises
- Import/export vocabulary lists

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (with Prisma ORM)
- **Authentication**: NextAuth.js
- **Testing**: Jest & React Testing Library
- **Deployment**: Docker & Docker Compose

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm 9.0 or later
- Docker and Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/domain-vocab.git
   cd domain-vocab
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

### Project Structure

```
src/
├── app/                 # Next.js 13+ app directory
├── components/          # Reusable components
│   ├── ui/             # Basic UI components
│   └── features/       # Feature-specific components
├── lib/                # Utility functions and shared logic
├── styles/             # Global styles and Tailwind config
├── types/              # TypeScript type definitions
└── prisma/             # Database schema and migrations
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 