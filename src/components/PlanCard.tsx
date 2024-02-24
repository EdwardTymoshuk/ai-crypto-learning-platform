import { cn, formatPrice } from '@/lib/utils'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { CHOOSE_PLAN } from '@/config'
import { HiCheckCircle } from 'react-icons/hi'
import { BiCheck } from "react-icons/bi"

const PlanCard = ({ price, description, options, recomended, index, isActive, onClick }: typeof CHOOSE_PLAN[number] & {isActive?: boolean, index?: number, onClick?: () => void}) => {
	return (
		<Card
			id={`plan-card-${index}`}
			className={cn('group flex flex-col justify-between min-h-[400px] w-full h-full border md:border-0 shadow-none hover:shadow-sm hover:bg-secondary-foreground hover:cursor-pointer transition-all duration-150', {
				'bg-secondary-foreground': isActive,
			})}
			onClick={onClick}
		>
			<CardHeader>
				{recomended && (
					<span className='relative text-center text-white -top-9 bg-primary px-2 mx-auto rounded-xl'>Recomended</span>
				)}
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
						<HiCheckCircle className={cn('flex h-3 w-3 translate-y-1 rounded-full text-primary group-hover:text-primary', {'text-primary': isActive})} />
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
					{isActive  ?
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
