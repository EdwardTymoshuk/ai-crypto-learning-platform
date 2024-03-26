import { appRouter } from '@/app/server'
// import { createTRPCContext } from '@/app/server/trpc'
import { env } from '@/env.mjs'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = async (req: Request) => {
  const result = fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          )
        }
        : undefined,
  })
  return result
}

export { handler as GET, handler as POST }

