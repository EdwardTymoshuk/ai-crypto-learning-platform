'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PageHeader from '@/components/PageHeader'
import PlanCard from '@/components/PlanCard'
import ProgressLine from '@/components/ProgressLine'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CHOOSE_PLAN } from '@/config'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'

const Page = () => {

	const storedChosenPlan = typeof window !== 'undefined' ? secureLocalStorage.getItem('chosenPlan') : null

	const [activeCardIndex, setActiveCardIndex] = useState<number | null>(storedChosenPlan !== null ? Number(storedChosenPlan) : null)
	const [isCompleted, setIsCompleted] = useState(false)

	const { data: user, status } = useSession()

	console.log(status)


	const handleCardClick = (index: number) => {
		setActiveCardIndex(index)
		setIsCompleted(true)
		secureLocalStorage.setItem('chosenPlan', index)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (status === 'authenticated' && user) {
					setIsCompleted(activeCardIndex !== null)
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}

		fetchData()
	}, [status, user, activeCardIndex])



	return (
		<MaxWidthWrapper className='min-h-screen py-12'>
			<PageHeader
				title='Choose plan to fit your needs'
				subtitle='Read all the plans and choose the one that perfectly suits your needs'
			/>
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
				<Link href='/payment' className={cn(buttonVariants(), 'rounded-lg')}>Next step &#8594;</Link>
			</div>
		</MaxWidthWrapper>
	)
}

export default Page
