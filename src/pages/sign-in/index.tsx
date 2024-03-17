'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { AuthCredentialsValidator, TAuthCredentialsValidator } from '@/lib/validators/CredentialsValidators'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa"
import { GoArrowRight } from 'react-icons/go'
import { toast } from 'sonner'

const Page = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentialsValidator>({
		resolver: zodResolver(AuthCredentialsValidator),
	})
	const { data: session } = useSession()
	const router = useRouter()

	const onSubmit = async ({ email, password }: TAuthCredentialsValidator) => {
		const result = await signIn("credentials", {
			redirect: false,
			email,
			password,
		})

		if (!result?.error) {
			toast.success('You were successfully logined')
			router.push("/")
		} else {
			toast.error(`Authentication failed`)
			console.error(`Authentication failed: ${result.error}`)
		}
	}

	// if (session) {
	// 	router.push("/")
	// 	return null
	// }

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
							<Button>
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
						<div className='text-sm flex flex-row items-center justify-center gap-1 border flex-1 py-2 rounded-lg bg-[#3e5996]'>
							<Link href=''>
								<FaFacebookF size={24} color='white' />
							</Link>
						</div>
						<div className='text-sm flex flex-row items-center justify-center gap-1 border flex-1 py-2 rounded-lg bg-[#e2432e]'>
							<Link href=''>
								<FaGoogle color='white' size={24} />
							</Link>
						</div>
						<div className='text-sm flex flex-row items-center justify-center gap-1 border flex-1 py-2 rounded-lg bg-[#2cb0ed]'>
							<Link href=''>
								<FaTelegramPlane color='white' size={24} />
							</Link>
						</div>
						<div className='text-sm flex flex-row items-center justify-center gap-1 border flex-1 py-2 rounded-lg bg-[#1973b1]'>
							<Link href=''>
								<FaLinkedinIn color='white' size={24} />
							</Link>
						</div>
						{/* <div className='text-4xl'>
							<Link href=''>
								<FaFacebook color='#3e5996' />
							</Link>
						</div>
						<div className='text-4xl'>
							<Link href=''>
								<FcGoogle />
							</Link>
						</div>
						<div className='text-4xl'>
							<Link href=''>
								<FaTelegram color='#2cb0ed' />
							</Link>
						</div>
						<div className='text-4xl'>
							<Link href=''>
								<FaLinkedin color='#1973b1' />
							</Link>
						</div> */}
					</div>
				</div>
			</div>
			<div className='bg-secondary flex-1 h-screen hidden lg:flex'>
			</div>
		</div>
	)
}

export default Page
