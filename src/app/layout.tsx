import Providers from '@/components/Providers'
import { cn } from '@/lib/utils'
import "@/styles/globals.css"
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from "next/font/google"
import React from 'react'
import { Toaster } from 'sonner'
import { authOptions } from './api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: 'Super Duper Student App',
	description: 'Super Duper Studnt App',
}

async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)
	return (
		<html lang='en'>
			<body className={cn('relative h-full font-sans antialiased', inter.className)}>
				<main className='relative flex flex-col min-h-screen'>
					<Providers session={session}>
						<div className='flex-grow flex-1'>
							{children}
						</div>
					</Providers>
				</main>
			</body>
			<Toaster position='top-center' richColors />
		</html>
	)
}

export default RootLayout
