'use client'

import SocialButton from '@/components/SocialButton'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/lib/validators/CredentialsValidators'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa'
import { GoArrowRight } from 'react-icons/go'
import { toast } from 'sonner'

const Page = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	})
	const router = useRouter()
	const { status } = useSession()

	const [toggle, setToggle] = useState(false)


	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/')
		}
	}, [status, router])


	const onSubmit = async ({ email, password }: TAuthCredentialsValidator) => {
		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		})

		if (result?.error) {
			console.error(`Authentication failed: ${result.error}`)
			toast.error('Authentication failed')
		} else {
			toast.success('You were successfully logged in')
			router.push('/')
		}
	}

	const onSocialSignIn = async (adapter: string) => {
		try {
			await signIn(`${adapter}`, {
				callbackUrl: '/'
			})
		} catch (error) {
			console.error(`Authentication failed: ${error}`)
			toast.error('Authentication failed')
		}

	}

	return (
		<div className='flex flex-col md:flex-row w-full min-h-screen justify-center items-center'>
			<div className='w-full flex-1 p-8 flex flex-col justify-center max-w-screen-sm'>
				<div className='flex flex-col items-start space-y-2'>
					<h1 className='text-2xl font-bold text-primary'>
						Sign in to your account
					</h1>
					<p className='flex flex-row items-center gap-1'>
						<span className='text-sm'>Don&apos;t have an account yet?</span>
						<Link
							className={cn(buttonVariants({
								variant: 'link',
							}), 'gap-1 px-0')}
							href='/sign-up'>
							Sign up
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
							<p className='flex flex-row items-end justify-end pb-2'>
								<Button
									variant='link'
									data-modal-target="default-modal"
									data-modal-toggle="default-modal"
									className='hover:decoration-dotted'
								>
									Forgot password?
								</Button>
							</p>
							<Button className=''>
								{
									'Sing in'
								}
							</Button>
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
					<div className='flex flex-row items-center gap-4 justify-around text-center'>
						<SocialButton icon={{ element: <FaFacebookF /> }} onClickHandler={() => onSocialSignIn('facebook')} />
						<SocialButton icon={{ element: <FaGoogle /> }} onClickHandler={() => onSocialSignIn('google')} />
						<SocialButton icon={{ element: <FaTelegramPlane /> }} onClickHandler={() => console.log('Telegram login')} />
						<SocialButton icon={{ element: <FaLinkedinIn /> }} onClickHandler={() => onSocialSignIn('linkedin')} />
					</div>
				</div>
				{/* MODAL WINDOW */}
				<div id="default-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
					<div className="relative p-4 w-full max-w-2xl max-h-full">
						{/* <!-- Modal content --> */}
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							{/* <!-- Modal header --> */}
							<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
									Terms of Service
								</h3>
								<button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
									<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
									</svg>
									<span className="sr-only">Close modal</span>
								</button>
							</div>
							{/* <!-- Modal body --> */}
							<div className="p-4 md:p-5 space-y-4">
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
								</p>
								<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
									The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
								</p>
							</div>
							{/* <!-- Modal footer --> */}
							<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
								<button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
								<button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-gradient-to-tr from-gradient-primary-from to-gradient-primary-to flex-1 h-screen hidden lg:flex'>
			</div>
		</div>

	)

}

export default Page