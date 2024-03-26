'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PageHeader from '@/components/PageHeader'
import ProgressLine from '@/components/ProgressLine'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { CHOOSE_PLAN, CHOOSE_PLAN_TYPE } from '@/config'
import { cn, formatPrice } from '@/lib/utils'
import { PaymentCredentialsValidator, TPaymentCredentialsValidator } from '@/lib/validators/CredentialsValidators'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ZodError } from 'zod'
import { api } from '../_trpc/client'
import { useUser } from '../context/UserContext'

const Page = () => {
	const { user } = useUser()
	const router = useRouter()
	const [email, setEmail] = useState(user?.email || '')
	const [choosenPlan, setChoosenPlan] = useState<CHOOSE_PLAN_TYPE>()
	const activeCardIndexRef = useRef<number | null | undefined>(user?.plan)
	const plan: CHOOSE_PLAN_TYPE | undefined = choosenPlan

	const { register, handleSubmit, formState: { errors, isValid } } = useForm<TPaymentCredentialsValidator>({
		resolver: zodResolver(PaymentCredentialsValidator),
		mode: 'onTouched',
	})

	useEffect(() => {
		activeCardIndexRef.current = user?.plan
		setChoosenPlan(CHOOSE_PLAN[Number(activeCardIndexRef.current) | 0])
	}, [user])

	const activeCardIndex = activeCardIndexRef.current

	const { mutate } = api.user.updateUser.useMutation({
		onError: (err) => {
			if (err instanceof ZodError) {
				console.error('error')
				return
			}

			console.error('Something went wrong. Please try again later.')
		},
		onSuccess: () => {
			router.push('/create-nft-profile')
		}
	})

	const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setEmail(value)
	}

	const onSubmit = () => {
		mutate({ email, data: { plan: activeCardIndex } })
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
						onClick={() => router.push('/plans')}
					>Change</Button>
				</div>
			</div>

		</MaxWidthWrapper>
	)
}

export default Page
