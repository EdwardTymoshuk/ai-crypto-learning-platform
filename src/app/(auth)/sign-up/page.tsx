'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/lib/validators/TAuthCredentialsValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { GoArrowRight } from 'react-icons/go'

const Page = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	})

	const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
		alert(`${email}  ${password}`)

	}

	return (
		<MaxWidthWrapper className='flex justify-center min-h-screen py-12'>
			<div className='flex flex-col mx-auto w-full justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col items-center space-y-2 text-center'>
					<h1 className='text-2xl font-bold'>
						Create an account
					</h1>

					<Link
						className={buttonVariants({
							variant: 'link',
							className: 'text-muted-foregroundgap-1.5',
						})}

						href='/sign-in'>
						Already have an account? Sign in
						<GoArrowRight />
					</Link>
				</div>
				<div className='grid gap-6'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid gap-2'>
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
								<Label htmlFor='password'>Password</Label>
								<Input
									{...register('password')}
									type='password'
									className={cn({
										'focus-visible:ring-red-500': errors.password

									})}
									placeholder='Password'
								/>
								{errors?.password && <p className='text-sm text-red-500 pt-2'>{errors.password.message}</p>}
							</div>
							<Button>Sing up</Button>
						</div>
					</form>
				</div>
			</div>
		</MaxWidthWrapper>
	)
}

export default Page
