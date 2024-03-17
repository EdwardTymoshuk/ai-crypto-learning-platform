'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PageHeader from '@/components/PageHeader'
import PlanCard from '@/components/PlanCard'
import ProgressLine from '@/components/ProgressLine'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CHOOSE_PLAN } from '@/config'
import { cn } from '@/lib/utils'
import { api } from '@/utils/api'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { ZodError } from 'zod'

const Page = () => {
	const router = useRouter()
	const { data: session, status } = useSession()

	if (session?.user.isCompleted) router.push('/')

	const { data } = api.user.getUser.useQuery(session ? session?.user.email : '')
	const userEmail = session?.user.email || ''
	const storedChosenPlan = data?.plan

	const [activeCardIndex, setActiveCardIndex] = useState<number | null>(storedChosenPlan !== null ? Number(storedChosenPlan) : null)
	const [isCompleted, setIsCompleted] = useState(false)

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
		mutate({ email: userEmail, data: { plan: activeCardIndex } })
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (status === 'authenticated' && session) {
					setIsCompleted(activeCardIndex !== null)
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}

		fetchData()
	}, [status, session, activeCardIndex])

	const handleSignOut = () => {
		signOut()
		secureLocalStorage.clear()
	}

	return (
		<MaxWidthWrapper className='min-h-screen py-12'>
			<PageHeader
				title='Choose plan to fit your needs'
				subtitle='Read all the plans and choose the one that perfectly suits your needs'
			/>
			<Button variant='secondary' onClick={() => handleSignOut()}>Log out</Button>
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
