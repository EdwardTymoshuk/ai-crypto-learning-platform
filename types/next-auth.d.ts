import {
	type DefaultSession,
	type DefaultUser,
} from "next-auth"

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: DefaultSession["user"] & {
			isCompleted: boolean
		}
	}
	interface User extends DefaultUser {
		isCompleted: boolean
	}
}