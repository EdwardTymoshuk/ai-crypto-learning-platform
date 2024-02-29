'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/lib/validators/CredentialsValidators'
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
						Sign in to your account
					</h1>

					<Link
						className={buttonVariants({
							variant: 'link',
							className: 'text-muted-foregroundgap-1.5',
						})}

						href='/sign-up'>
						Don&apos;t have an account? Sign up
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
							<Button>Sing in</Button>
						</div>
					</form>
					<div className='relative'>
						<div aria-hidden='true' className='absolute inset-0 flex items-center'>
							<span className='w-full border-t' />
						</div>
						<div className='relative flex justify-center text-xs uppercase'>
							<span className='bg-background px-2 text-muted-foreground'>
								or
							</span>
						</div>
					</div>
					<div className='flex flex-col items-center space-y-2 text-center'>
						{/* TO DO: sign in with google, github, fb, linkedin */}

					</div>
				</div>
			</div>
		</MaxWidthWrapper>
	)
}

export default Page
