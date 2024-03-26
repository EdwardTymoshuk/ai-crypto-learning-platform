import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"

// interface CreateContextOptions {
//   session: Session | null
// }

// const createInnerTRPCContext = async (opts: CreateContextOptions) => {
//   const db = await dbPromise

//   return {
//     session: opts.session,
//     db,
//   }
// }

// export const createTRPCContext = async (opts: CreateNextContextOptions) => {
//   const { req, res } = opts
//   const session = await getServerAuthSession({ req, res })

//   return createInnerTRPCContext({
//     session,
//   })
// }

const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

// const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
//   if (!ctx.session?.user) {
//     throw new TRPCError({ code: "UNAUTHORIZED" })
//   }

//   return next({
//     ctx: {
//       session: { ...ctx.session, user: ctx.session.user },
//     },
//   })
// })

// export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
