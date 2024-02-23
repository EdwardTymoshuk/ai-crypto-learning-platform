'use client'

import { cn, formatPrice } from '@/lib/utils'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { CHOOSE_PLAN } from '@/config'
import { HiCheckCircle } from 'react-icons/hi'
import { BiCheck } from "react-icons/bi"
import { useState } from 'react'
import { FaBullseye } from 'react-icons/fa'

const PlanCard = ({ price, description, options, recomended, index }: typeof CHOOSE_PLAN[number] & {index: number}) => {
	const [isActive, setIsActive] = useState(false)
	const [selectedPlan, setSelectedPlan] = useState(-1)

	const handleClick = (index:number) => {
		if (isActive) {
			return
		} else {
			setIsActive(true);
			setSelectedPlan(index);
		}
	}
	return (
		<Card
			className={cn('group flex flex-col justify-between min-h-[400px] w-full h-full border md:border-0 shadow-none hover:shadow-sm hover:bg-primary hover:cursor-pointer transition-all duration-150', {
				'bg-primary': isActive,
			})}
			onClick={() => handleClick(index)}
		>
			<CardHeader>
				<CardTitle className={cn('flex flex-row justify-between group-hover:text-white', {'text-white': isActive})}>
					<p>{price.label}</p>
					<p className='font-medium'>{formatPrice(price.price, { removeTrailingZeros: true })}</p>
				</CardTitle>
				<CardDescription className={cn('group-hover:text-muted text-sm pt-2 pb-4', {'text-muted': isActive})}>
					{description}
				</CardDescription>
				<Separator className='mx-auto w-4/5' />
			</CardHeader>
			<CardContent>
				{options.map((value, index) => (
					<div key={index} className='mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0'>
						<HiCheckCircle className={cn('flex h-3 w-3 translate-y-1 rounded-full text-primary group-hover:text-green-500', {'text-green-500': isActive})} />
						<div className='space-y-1'>
							<p className={cn('text-sm font-normal leading-none group-hover:text-white', {'text-white': isActive})}>
								{value}
							</p>
						</div>
					</div>
				))}
			</CardContent>
			<CardFooter className='justify-center'>
				<Button
					variant='outline'
					className='rounded-lg hover:bg-primary-foreground'>
					{selectedPlan === index ?
						<>
							<BiCheck className="inline-block mr-1 text-green-500" />
							Choosen
						</>
						: 'Choose plan'}
				</Button>
			</CardFooter>
		</Card>
	)
}

export default PlanCard
