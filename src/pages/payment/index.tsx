'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PageHeader from '@/components/PageHeader'
import ProgressLine from '@/components/ProgressLine'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CHOOSE_PLAN } from '@/config'
import { cn, formatPrice } from '@/lib/utils'
import { PaymentCredentialsValidator, TPaymentCredentialsValidator } from '@/lib/validators/CredentialsValidators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import secureLocalStorage from 'react-secure-storage'

const Page = () => {

	const router = useRouter()

	const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
	const [email, setEmail] = useState(secureLocalStorage.getItem('email')?.toString())

	useEffect(() => {
		const storedEmail = typeof window !== 'undefined' ? secureLocalStorage.getItem('email') : ''
		if (storedEmail !== '') {
			setEmail(String(storedEmail))
		}

		const storedPlanId = typeof window !== 'undefined' ? secureLocalStorage.getItem('chosenPlan') : null
		if (storedPlanId !== null) {
			setActiveCardIndex(Number(storedPlanId))
		}
	}, [])

	const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm<TPaymentCredentialsValidator>({
		resolver: zodResolver(PaymentCredentialsValidator),
		mode: 'onTouched',
	})

	const plan = CHOOSE_PLAN[Number(activeCardIndex) | 0]

	const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setEmail(value)
		secureLocalStorage?.setItem('email', value)
	}

	const onSubmit = () => {
		secureLocalStorage?.setItem('name', getValues().name)
		router.push('/create-nft-profile')
	}

	return (
		<MaxWidthWrapper className='flex flex-col min-h-screen py-12'>
			<PageHeader
				title='Payment page'
				subtitle='Provide your payment details to continue creating an account'
			/>
			<ProgressLine page={3} isCompleted={isValid} />
			<div className='flex flex-col-reverse md:flex-row py-10 my-auto mx-auto w-full justify-center gap-6'>
				<div className='grid gap-6 w-full'>
					<h3 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">Payment details:</h3>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid gap-2'>
							<div className='grip gap-1 py-2'>
								<Label htmlFor='name'>Name</Label>
								<Input
									{...register('name')}
									className={cn({
										'focus-visible:ring-red-500': errors.name

									})}
									placeholder='Name'
								/>
								{errors?.name && <p className='text-sm text-red-500 pt-2'>{errors.name.message}</p>}
							</div>
							<div className='grip gap-1 py-2'>
								<Label htmlFor='surname'>Surname</Label>
								<Input
									{...register('surname')}
									className={cn({
										'focus-visible:ring-red-500': errors.surname

									})}
									placeholder='Surname'
								/>
								{errors?.surname && <p className='text-sm text-red-500 pt-2'>{errors.surname.message}</p>}
							</div>
							<div className='grip gap-1 py-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									{...register('email')}
									className={cn({
										'focus-visible:ring-red-500': errors.email

									})}
									placeholder='you@example.com'
									value={email ? email : ''}
									onChange={handleEmailInputChange}
								/>
								{errors?.email && <p className='text-sm text-red-500 pt-2'>{errors.email.message}</p>}
							</div>
							<div className='grip gap-1 py-2'>
							</div>
							<Button
								className='rounded-lg transition-opacity duration-300'
								disabled={!isValid || Object.keys(errors).length > 0}
							>
								Confirm
							</Button>

						</div>
					</form>
				</div>
				<Separator orientation='vertical' className='h-auto' />
				<div className='space-y-2 w-full'>
					<h3 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">Choosen plan:</h3>
					<Card className={`bg-${plan?.color}`}>
						<CardHeader>
							<CardTitle className='flex flex-row justify-between text-foreground'>
								<p>{plan?.price.label}</p>
								<p className='font-medium'>
									{plan && plan.price && typeof plan.price.price === 'number' ? formatPrice(plan.price.price, { removeTrailingZeros: true }) : ''}
								</p>
							</CardTitle>
							<CardDescription className='text-sm text-foreground pt-2'>
								{plan?.description}
							</CardDescription>
						</CardHeader>
					</Card>
					<Button
						className='float-end rounded-lg'
						onClick={() => router.back()}
					>Change</Button>
				</div>
			</div>

		</MaxWidthWrapper>
	)
}

export default Page
