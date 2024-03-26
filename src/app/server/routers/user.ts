
import User from '@/app/server/db/models/Users'
import { TRPCError } from '@trpc/server'
import bcrypt from 'bcryptjs'
import { TUser } from 'next-auth'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import connectMongoDB from '../db/mongodb'
import { createTRPCRouter, publicProcedure } from '../trpc'

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
        if (existingUser) throw new TRPCError({ code: 'CONFLICT' })

        const newUser = await User.create({ id: uuidv4(), email, password: hashedPassword })
        return { success: true, newUser }
        // Create the user
      } catch (error) {
        // Handle any errors
        console.error("Error creating user:", error)
        throw error
      }
    }),
  getUser: publicProcedure
    .input(z.string().email() || undefined)
    .query(async ({ input }) => {
      try {
        const user: TUser | null = await User.findOne({ email: input })
        if (!user) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
        }
        return user
      } catch (error) {
        console.error('Error fetching user:', error)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch user' })
      }
    }),
  updateUser: publicProcedure
    .input(z.object({
      email: z.string().email(),
      data: z.any()
    }))
    .mutation(async ({ input }) => {
      try {
        const { email, data } = input

        await connectMongoDB()
        console.log(data)
        const user = await User.findOneAndUpdate(
          { email },
          { $set: data },
          { new: true }
        )

        return { success: true, user }
      } catch (error) {
        console.error('Error updating user:', error)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to update user' })
      }
    })
})