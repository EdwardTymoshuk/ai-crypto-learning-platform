'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/lib/validators/CredentialsValidators'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { GoArrowRight } from 'react-icons/go'
import secureLocalStorage from 'react-secure-storage'
import { toast } from 'sonner'
import { ZodError } from 'zod'

const Page = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	})
	const router = useRouter()

	const { mutate, isLoading } = api.user.createUser.useMutation({
		onError: (err) => {
			if (err.data?.code === 'CONFLICT') {
				toast.error(
					'This email is already in use. Sign in instead?'
				)
				return
			}

			if (err instanceof ZodError) {
				toast.error(err?.issues[0]?.message)
				return
			}

			toast.error(
				'Something went wrong. Please try again.'
			)
		},
		onSuccess: () => {
			toast.success(`New User was succesfully created`)
			router.push('/plans')
		}
	})

	const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
		secureLocalStorage.setItem('email', email)
		mutate({ email, password })
	}

	return (
		<MaxWidthWrapper className='flex flex-col justify-center min-h-screen py-12'>
			<div className='flex flex-col mx-auto w-full justify-center px-8 md:px-0 sm:w-[350px]'>
				<div className='flex flex-col items-start space-y-2'>
					<h1 className='text-2xl font-bold text-primary'>
						Create an account
					</h1>
					<p className='flex flex-row items-center gap-1'>
						<span className='text-sm'>Already have an account?</span>
						<Link
							className={cn(buttonVariants({
								variant: 'link',
							}), 'gap-1 px-0')}
							href='/sign-in'>
							Sign in
							<GoArrowRight />
						</Link>
					</p>
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
							<Button>{isLoading ? 'Loading...' : 'Sign up'}</Button>
						</div>
					</form>
				</div>
			</div>
		</MaxWidthWrapper>
	)
}

export default Page
