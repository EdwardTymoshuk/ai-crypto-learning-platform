'use client'

import { api } from '@/app/_trpc/client'
import { UserProvider } from '@/app/context/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { Session } from 'next-auth'
import { SessionProvider, getSession } from 'next-auth/react'
import { AppContext } from 'next/app'
import { useState } from 'react'
import superjson from "superjson"

export function Providers({ children, session }: { children: React.ReactNode, session: Session | null }) {
	const getBaseUrl = () => {
		if (typeof window !== "undefined") return ""
		if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
		return `http://localhost:${process.env.PORT ?? 3000}`
	}
	const [queryClient] = useState(() => new QueryClient)
	const [trpcClient] = useState(() => api.createClient({
		transformer: superjson,
		links: [
			loggerLink({
				enabled: (opts) =>
					process.env.NODE_ENV === "development" ||
					(opts.direction === "down" && opts.result instanceof Error),
			}),
			httpBatchLink({
				url: `${getBaseUrl()}/api/trpc`,
			}),
		],
	})
	)
	return (
		<api.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<SessionProvider session={session}>
					<UserProvider>

						{children}

					</UserProvider>
				</SessionProvider>
			</QueryClientProvider>
		</api.Provider>
	)
}

Providers.getInitialProps = async (context: AppContext) => {
	const { ctx } = context
	const session = await getSession(ctx)

	return {
		session,
	}
}

export default Providers