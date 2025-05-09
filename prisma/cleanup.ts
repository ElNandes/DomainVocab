import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanup() {
  // Get all domains
  const domains = await prisma.domain.findMany()
  
  // Group domains by name
  const domainGroups = domains.reduce((acc, domain) => {
    if (!acc[domain.name]) {
      acc[domain.name] = []
    }
    acc[domain.name].push(domain)
    return acc
  }, {} as Record<string, typeof domains>)

  // For each group, keep the first domain and delete the rest
  for (const [name, group] of Object.entries(domainGroups)) {
    if (group.length > 1) {
      const [keep, ...remove] = group
      console.log(`Keeping domain "${name}" with ID ${keep.id}, removing ${remove.length} duplicates`)
      
      // Delete vocabulary associated with domains to be removed
      await prisma.vocabulary.deleteMany({
        where: {
          domainId: {
            in: remove.map(d => d.id)
          }
        }
      })

      // Delete the duplicate domains
      await prisma.domain.deleteMany({
        where: {
          id: {
            in: remove.map(d => d.id)
          }
        }
      })
    }
  }

  console.log('Cleanup completed!')
}

cleanup()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 