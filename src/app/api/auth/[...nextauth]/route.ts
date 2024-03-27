import { clientPromise } from '@/app/server/db'
import User from '@/app/server/db/models/Users'
import connectMongoDB from '@/app/server/db/mongodb'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import { TRPCError } from '@trpc/server'
import bcrypt from "bcryptjs"
import { GetServerSidePropsContext } from 'next'
import { NextAuthOptions, TUser, getServerSession } from "next-auth"
import NextAuth from 'next-auth/next'
import CredentialsProvider from "next-auth/providers/credentials"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin"


// List of admin emails for authorization
const adminEmails = ["eduard.tymoshuk@gmail.com", "eduard.tymoshuk.dev@gmail.com", "test@test.com"]

// Configuration options for NextAuth
export const authOptions: NextAuthOptions = {
	providers: [
		// Google OAuth provider configuration
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID || '',
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ''
		}),
		LinkedInProvider({
			clientId: process.env.LINKEDIN_CLIENT_ID || '',
			clientSecret: process.env.LINKEDIN_CLIENT_SECRET || ''
		}),
		// Custom credentials provider for email/password authentication
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<TUser | null> {
				// Add logic to verify credentials here
				if (!credentials) return null

				const { email, password } = credentials

				try {
					await connectMongoDB()
					// Fetch user from your database based on the provided email
					const user = await User.findOne({ email })

					// Check if the provided password matches the stored hashed password
					if (user && bcrypt.compareSync(password, user.password)) {
						// Return the user object if credentials are valid
						return user as TUser
					} else {
						// Return null if credentials are invalid
						throw new Error("Invalid email or password")
					}

				} catch (error) {
					if (error instanceof Error) {
						throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: `Internal server error: ${error.message}` })
					} else {
						throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Internal server error occurred.' })
					}
				}
			},
		}),
	],

	// Session configuration
	session: {
		strategy: "jwt", // Use JWT for session management

	},

	jwt: {
		secret: process.env.NEXTAUTH_SECRET,
	},

	// Secret used to encrypt the session data
	secret: process.env.NEXTAUTH_SECRET,

	// MongoDB adapter for storing NextAuth data
	adapter: MongoDBAdapter(clientPromise),

	// Callbacks for handling session data
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user && user.name) {
				token.name = user.name
			}
			return token
		},
		session: async ({ session, user }) => {
			if (user) {
				session.user.isCompleted = user.isCompleted
			}

			if (user && user.name) {
				session.user.name = user.name
			}

			return session
		},
	},
	pages: {
		signIn: '/sign-in',
	}

}

// Export the configured NextAuth instance
export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// Middleware for checking if the user is an admin
export async function isAdminRequest({ req, res }: {
	req: GetServerSidePropsContext["req"]
	res: GetServerSidePropsContext["res"]
}) {
	// Check if the user"s email is in the list of admin emails
	const session = await getServerSession(req, res, authOptions)

	if (session && !adminEmails.includes(session.user.email)) {
		res.writeHead(401, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify({ error: "You're not an admin" }))
		throw new TRPCError({ code: 'NOT_FOUND', message: `You're not an admin` })
	}
}
