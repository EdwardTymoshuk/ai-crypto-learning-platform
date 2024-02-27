'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PageHeader from '@/components/PageHeader'
import ProgressLine from '@/components/ProgressLine'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CHOOSE_PLAN } from '@/config'
import { cn, formatPrice } from '@/lib/utils'
import { PaymentCredentialsValidator, TPaymentCredentialsValidator } from '@/lib/validators/TAuthCredentialsValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const Page = () => {

	const router = useRouter()
	const { register, handleSubmit, formState: { errors, isValid } } = useForm<TPaymentCredentialsValidator>({
		resolver: zodResolver(PaymentCredentialsValidator),
	})
	const { price, description } = CHOOSE_PLAN[0]

	const onSubmit = () => {
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
				<div className='space-y-2 w-full'>
					<h3 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">Choosen plan:</h3>
					<Card className='bg-secondary-foreground'>
						<CardHeader>
							<CardTitle className='flex flex-row justify-between text-secondary'>
								<p>{price.label}</p>
								<p className='font-medium'>{formatPrice(price.price, { removeTrailingZeros: true })}</p>
							</CardTitle>
							<CardDescription className='text-sm text-primary-foreground pt-2'>
								{description}
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
