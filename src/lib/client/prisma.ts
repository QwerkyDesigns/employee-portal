import { PrismaClient } from '@prisma/client'
import { env } from '../../env/server.mjs'

let client: PrismaClient<{
  log: ("error" | "query" | "warn")[];
}, never, false> | undefined

function createClient () {
  return new PrismaClient({
    log:
        env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
  })
}

if (client === undefined) {
  client = createClient()
}

export const prisma = client
