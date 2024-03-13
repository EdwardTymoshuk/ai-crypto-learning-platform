import { env } from "@/env.mjs"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import bcrypt from 'bcryptjs'
import { type GetServerSidePropsContext } from "next"
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { clientPromise } from "./db"
import User from './db/models/Users'


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string,
      email: string,
      password: string,
      role: string,
    },
    session: Session,
    token: string
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        // Add logic to verify credentials here
        if (!credentials) return null

        const { email, password } = credentials

        // Fetch user from your database based on the provided email
        const user = await User.findOne({ email })

        // Check if the provided password matches the stored hashed password
        if (user && bcrypt.compareSync(password, user.password)) {
          // Return the user object if credentials are valid
          return user
        } else {
          // Return null if credentials are invalid
          throw new Error("Invalid email or password")
        }
      },
    }),
  ],
}

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
