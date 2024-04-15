'use client'

import { api } from '@/app/_trpc/client'
import AuthPageHeader from '@/components/AuthPageHeader'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PlanCard from '@/components/PlanCard'
import ProgressLine from '@/components/ProgressLine'
import { Button } from '@/components/ui/button'
import { CHOOSE_PLAN } from '@/config'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ZodError } from 'zod'
import { useUser } from '../context/UserContext'

const Page = () => {
	const router = useRouter()
	const { user, setUser } = useUser()
	const [activeCardIndex, setActiveCardIndex] = useState<number | null>(user?.plan || null)
	const [isCompleted, setIsCompleted] = useState(!!activeCardIndex)
	const [email, setEmail] = useState<string>(user?.email || '')

	useEffect(() => {
		if (user && user.plan) {
			setEmail(user?.email)
			setActiveCardIndex(user?.plan)
		}
		if (activeCardIndex) {
			setIsCompleted(true)
		}
	}, [user, activeCardIndex])

	const { mutate, isLoading } = api.user.updateUser.useMutation({
		onError: (err) => {
			if (err instanceof ZodError) {
				console.error('error')
				return
			}

			console.error('Something went wrong. Please try again later.')
		},
		onSuccess: () => {
			setUser(prevUser => ({
				...prevUser!,
				plan: activeCardIndex !== null ? activeCardIndex : undefined
			}))
			router.push('/create-nft-profile')
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
			<AuthPageHeader
				title='Choose plan to fit your needs'
				subtitle='Read all the plans and choose the one that perfectly suits your needs'
			/>
			<Button variant='secondary' onClick={() => signOut()}>Log out</Button>
			<ProgressLine page={2} isCompleted={isCompleted} />
			<div className='grid grid-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 lg:gap-4 w-full py-4 my-14 px-2'>
				{CHOOSE_PLAN.map((value, index) => (
					<div key={index} className='flex flex-row group'>
						<PlanCard
							{...value}
							index={index}
							isActive={index === activeCardIndex}
							onClick={() => handleCardClick(index)}
						/>
					</div>
				))}
			</div>
			<div className={cn('flex justify-end transition-opacity duration-300', { 'opacity-0': !isCompleted, 'invisible': !isCompleted })}>
				<Button onClick={() => nextStep()} className={'rounded-lg'}>{isLoading ? 'Loading...' : ' Next step  \u2192'}</Button>
			</div>
		</MaxWidthWrapper>
	)
}

export default Page