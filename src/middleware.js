import { withAuth } from "next-auth/middleware"

export default withAuth({
	pages: {
		signIn: '/sign-in',
	},
	callbacks: {
		authorized: ({ req, token }) =>
			req.nextUrl.pathname === '/sign-up' ||
			!!token,
	}
})