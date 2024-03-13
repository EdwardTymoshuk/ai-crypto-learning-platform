import {
  createTRPCRouter,
  publicProcedure
} from "@/server/api/trpc"
import User from '@/server/db/models/Users'
import connectMongoDB from '@/server/db/mongodb'
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

export const user = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      try {
        const { email, password } = opts.input

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Connect to MongoDB
        await connectMongoDB()

        // Check if user with the email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
          throw new TRPCError({ code: 'CONFLICT' })
        } else {
          const newUser = await User.create({ email, password: hashedPassword })

          // Return the newly created user
          return newUser
        }
        // Create the user
      } catch (error) {
        // Handle any errors
        console.error("Error creating user:", error)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "Failed to create user" })
      }
    }),
  getUser: publicProcedure
    .input(z.string().email())
    .query(async ({ ctx, input }) => {
      try {
        const user = ctx.db.collection('User').findOne({ email: input })
        if (!user) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
        }
        return user
      } catch (error) {
        console.error('Error fetching user:', error)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch user' })
      }
    }),
})

  // updateUser: publicProcedure.input(z.object({
  //   name: z.string(),
  //   surname: z.string(),
  //   industry: z.string(),
  //   curentPosition: z.string(),
  //   pretendedToBe: z.string(),
  //   exprerience: z.string(),
  // })).mutation((opts) => {
  //   const { input } = opts
  //   console.log(input)
  // })
