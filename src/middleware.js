import { withAuth } from "next-auth/middleware"

export default withAuth({
	pages: {
		signIn: '/sign-in',
	},
	exclude: ['/sign-up']
})