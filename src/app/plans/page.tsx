'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PlanCard from '@/components/PlanCard'
import { Separator } from '@/components/ui/separator'
import { CHOOSE_PLAN } from '@/config'
import { useState } from 'react'

const Page = () => {
	const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

    const handleCardClick = (index:number) => {
        setActiveCardIndex(index);
    };
	return (
		<MaxWidthWrapper className='min-h-screen py-12'>
			<div className='flex flex-col justify-start'>
				<h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
					Choose plan to fit your needs.
				</h1>
				<h2 className="scroll-m-20 border-b pb-2 text-l lg:text-xl font-semibold tracking-tight first:mt-0 text-muted-foreground">
					Read all the plans and choose the one that perfectly suits your needs
				</h2>
			</div>
			<div className='grid grid-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-0 w-full py-4 my-14'>
				{CHOOSE_PLAN.map((value, index) => (
					<div key={index} className='flex flex-row group'>
					<PlanCard 
						{...value} 
						index={index} 
						isActive={index===activeCardIndex}
						onClick={() => handleCardClick(index)}
						/>
					<Separator orientation='vertical' className='hidden md:block group-last:hidden max-lg:group-even:hidden'/>
					</div>
				))}
			</div>
		</MaxWidthWrapper>
	)
}

export default Page
