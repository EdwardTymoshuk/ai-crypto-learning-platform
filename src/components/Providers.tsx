'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import { PropsWithChildren } from 'react'

const Providers = ({ children }: PropsWithChildren) => {
	const { data: session } = useSession()

	return (
		<SessionProvider session={session}>
			{children}
		</SessionProvider>
	)
}

export default Providers