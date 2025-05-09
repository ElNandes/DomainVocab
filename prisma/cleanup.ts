import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanup() {
  try {
    // Delete all vocabulary entries first (due to foreign key constraints)
    await prisma.vocabulary.deleteMany({})
    console.log('All vocabulary entries deleted')

    // Then delete all domains
    await prisma.domain.deleteMany({})
    console.log('All domains deleted')

    console.log('Cleanup completed!')
  } catch (error) {
    console.error('Error during cleanup:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanup() 