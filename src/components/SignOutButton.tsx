'use client'

import { useUser } from '@/app/context/UserContext'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button, ButtonProps } from './ui/button'

const SignOutButton = ({ variant }: { variant: ButtonProps['variant'] }) => {
	const { setUser } = useUser()
	const router = useRouter()
	return (
		<Button
			variant={variant}
			onClick={() => {
				signOut()
				setUser(null)
				router.refresh()
			}}
		>Log out</Button>
	)
}

export default SignOutButton
