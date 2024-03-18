'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PageHeader from '@/components/PageHeader'
import PlanCard from '@/components/PlanCard'
import ProgressLine from '@/components/ProgressLine'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CHOOSE_PLAN } from '@/config'
import { cn } from '@/lib/utils'
import User from '@/server/db/models/Users'
import connectMongoDB from '@/server/db/mongodb'
import { api } from '@/utils/api'
import { GetServerSidePropsContext } from 'next'
import { TUser } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ZodError } from 'zod'

const Page = ({ user: { email, plan } }: { user: TUser }) => {
	const router = useRouter()

	const [activeCardIndex, setActiveCardIndex] = useState<number | null>(plan || null)
	const [isCompleted, setIsCompleted] = useState(false)

	useEffect(() => {
		setIsCompleted(!!plan)
	}, [])

	const { mutate, isLoading } = api.user.updateUser.useMutation({
		onError: (err) => {
			if (err instanceof ZodError) {
				console.error('error')
				return
			}

			console.error('Something went wrong. Please try again later.')
		},
		onSuccess: () => {
			router.push('/payment')
		}
	})

	const handleCardClick = (index: number) => {
		setActiveCardIndex(index)
		setIsCompleted(true)
	}

	const nextStep = () => {
		mutate({ email, data: { plan: activeCardIndex } })
	}

	return (
		<MaxWidthWrapper className='min-h-screen py-12'>
			<PageHeader
				title='Choose plan to fit your needs'
				subtitle='Read all the plans and choose the one that perfectly suits your needs'
			/>
			<Button variant='secondary' onClick={() => signOut()}>Log out</Button>
			<ProgressLine page={2} isCompleted={isCompleted} />
			<div className='grid grid-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-0 w-full py-4 my-14'>
				{CHOOSE_PLAN.map((value, index) => (
					<div key={index} className='flex flex-row group'>
						<PlanCard
							{...value}
							index={index}
							isActive={index === activeCardIndex}
							onClick={() => handleCardClick(index)}
						/>
						<Separator orientation='vertical' className='hidden md:block group-last:hidden max-lg:group-even:hidden' />
					</div>
				))}
			</div>
			<div className={cn('flex justify-end transition-opacity duration-300', { 'opacity-0': !isCompleted, 'invisible': !isCompleted })}>
				<Button onClick={nextStep} className={'rounded-lg'}>{isLoading ? 'Loading...' : ' Next step  \u2192'}</Button>
			</div>
		</MaxWidthWrapper>
	)
}

export default Page

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { getSession } = await import('next-auth/react')

	const session = await getSession(context)
	if (!session || !session.user) {
		return {
			redirect: {
				destination: '/sign-in',
				permanent: false,
			},
		}
	}

	try {
		connectMongoDB()
		const userEmail = session?.user?.email
		const user = await User.findOne({ email: userEmail }).then(res => JSON.parse(JSON.stringify(res)))
		if (!user) {
			throw new Error('Failed to fetch user data')
		}

		return {
			props: { user },
		}
	} catch (error) {
		console.error('Error fetching user data:', error)
		return {
			redirect: {
				destination: '/error',
				permanent: false,
			},
		}
	}
}
