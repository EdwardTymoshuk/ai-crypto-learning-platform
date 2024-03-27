'use client'

import { CHOOSE_PLAN } from '@/config'
import { cn, formatPrice } from '@/lib/utils'
import { BiCheck } from 'react-icons/bi'
import { HiCheckCircle } from 'react-icons/hi'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'

const PlanCard = ({ price, description, options, recomended, index, isActive, color, onClick }: typeof CHOOSE_PLAN[number] & { isActive?: boolean, index?: number, onClick?: () => void }) => {
	return (
		<Card
			id={`plan-card-${index}`}
			className={cn('group flex flex-col justify-between min-h-[400px] w-full h-full border md:border-0 shadow-none hover:shadow-sm hover:bg-primary hover:cursor-pointer transition-all duration-150', {
				'bg-primary': isActive,
			})}
			onClick={onClick}
		>
			<CardHeader className='relative'>
				{recomended && (
					<div className='flex justify-center'>
						<span className='absolute -top-3 w-fit text-center text-white bg-secondary px-2 mx-auto rounded-xl'
						>Recomended</span>
					</div>
				)}
				<CardTitle className={cn('flex flex-row justify-between group-hover:text-white', { 'text-white': isActive })}>
					<p className={`bg-${color ? color : 'black'} py-1 px-2 rounded-xl`}>{price.label}</p>
					<p className='font-medium'>{price && price && typeof price.price === 'number' ? formatPrice(price.price, { removeTrailingZeros: true }) : ''}</p>
				</CardTitle>
				<CardDescription className={cn('group-hover:text-muted text-sm pt-2 pb-4', { 'text-muted': isActive })}>
					{description}
				</CardDescription>
				<Separator className='mx-auto w-4/5' />
			</CardHeader>
			<CardContent>
				{options.map((value, index) => (
					<div key={index} className='mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0'>
						<HiCheckCircle className={cn('flex h-3 w-3 translate-y-1 rounded-full text-secondary group-hover:text-secondary', { 'text-secondary': isActive })} />
						<div className='space-y-1'>
							<p className={cn('text-sm font-normal leading-none group-hover:text-white', { 'text-white': isActive })}>
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
					{isActive ?
						<>
							<BiCheck className='inline-block mr-1 text-green-500' />
							Choosen
						</>
						: 'Choose plan'}
				</Button>
			</CardFooter>
		</Card>
	)
}

export default PlanCard
