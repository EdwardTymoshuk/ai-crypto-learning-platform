import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth/next"
import { useRouter } from 'next/navigation'



export async function getCurrentUser() {
	const session = await getServerSession(authOptions)

	return session?.user
}

export const withLogined = async (component: JSX.Element) => {
	const session = await getServerSession(authOptions)
	const redirect = useRouter()

	if (session) {
		redirect.push('/')

	}

	return (
		{ component }
	)
}