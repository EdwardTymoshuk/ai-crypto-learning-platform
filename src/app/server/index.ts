import { user } from './routers/user'
import { createTRPCRouter } from './trpc'


export const appRouter = createTRPCRouter({
  user: user,
})

export type AppRouter = typeof appRouter