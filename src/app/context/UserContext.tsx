'use client'

import { TUser } from 'next-auth'
import { useSession } from 'next-auth/react'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

interface UserContextInterface {
	user: TUser | null,
	setUser: Dispatch<SetStateAction<TUser | null>>
}

const UserContext = createContext<UserContextInterface>({
	user: null,
	setUser: () => { }
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<TUser | null>(null)

	const { data: session, status: sessiionStatus } = useSession()



	const email = session?.user.email || ''
	// const { data: fetchedUser, status } = api.user.getUser.useQuery(email)
	const fetchedUser = null
	const status = 'success'

	useEffect(() => {
		if (status === 'success' && !user) {
			setUser(fetchedUser)
		}
	}, [user, session, status, fetchedUser])

	const value = {
		user,
		setUser,
	}

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => {
	return useContext(UserContext)
}