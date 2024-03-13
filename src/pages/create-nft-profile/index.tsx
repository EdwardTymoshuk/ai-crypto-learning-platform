'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PageHeader from '@/components/PageHeader'
import ProgressLine from '@/components/ProgressLine'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { CreateNFTProfileCredentialsValidator, TCreateNFTProfileCredentialsValidator } from '@/lib/validators/CredentialsValidators'
import { api } from '@/utils/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdInfoOutline } from "react-icons/md"
import secureLocalStorage from 'react-secure-storage'
import { toast } from 'sonner'
import { ZodError } from 'zod'

const Page = () => {
	const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm<TCreateNFTProfileCredentialsValidator>({
		resolver: zodResolver(CreateNFTProfileCredentialsValidator),
		mode: 'onChange',
	})

	const session = useSession()

	console.log(session)

	const router = useRouter()

	const [name, setName] = useState('')

	useEffect(() => {
		const storedName = typeof window !== 'undefined' ? String(secureLocalStorage.getItem('name') || '') : ''
		setName(storedName)
	}, [])

	// const email = typeof window !== 'undefined' ? String(secureLocalStorage.getItem('email')) : ''
	const password = typeof window !== 'undefined' ? String(secureLocalStorage.getItem('password')) : ''
	const surname = typeof window !== 'undefined' ? String(secureLocalStorage.getItem('surname')) : ''

	const data = { name, surname, ...getValues() }


	const { mutate, isLoading } = api.auth.updateUser.useMutation({
		onError: (err) => {
			if (err instanceof ZodError) {
				toast.error('error')
				return
			}

			toast.error('Something went wrong. Please try again later.')
		},
		onSuccess: () => {
			toast.success('Your account was successfully updated.')
			router.push('/')
		}
	})

	const onSubmit = () => {
		// mutate({ ...data })
	}

	return (
		<MaxWidthWrapper>
			<PageHeader
				title='Create NFT profile'
				subtitle='Let&apos;s get to know each other better'
			/>
			<ProgressLine page={4} isCompleted={false} />
			<div className='flex flex-col mx-auto w-full justify-center space-y-6 sm:w-[450px]'>
				<div className='grid gap-6 w-full'>
					<h3 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl">Hi {name || 'there'}!</h3>
					<span className='text-muted-foreground'>It&apos;s almost done! We&apos;d be very happy to know You better, tell us a little about yourself.</span>
					<Separator />
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='grid gap-2'>
							<div className='grid gap-1 py-2'>
								<Label htmlFor='industry'>
									<div className='flex gap-1 pb-1'>
										Industry
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger onClick={(e) => e.stopPropagation()}>
													<MdInfoOutline />
												</TooltipTrigger>
												<TooltipContent>
													<p>Industry you&apos;re currently working in</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
								</Label>
								<Input
									{...register('industry')}
									className={cn({
										'focus-visible:ring-red-500': errors.industry

									})}
									placeholder='Industry'
								/>
								{errors?.industry && <p className='text-sm text-red-500 pt-2'>{errors.industry.message}</p>}
							</div>
							<div className='grid gap-1 py-2'>
								<Label htmlFor='currentPosition'>
									<div className='flex gap-1 pb-1'>
										Current position
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger onClick={(e) => e.stopPropagation()}>
													<MdInfoOutline />
												</TooltipTrigger>
												<TooltipContent>
													<p>Your current position in company you&apos;re working in</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
								</Label>
								<Input
									{...register('currentPosition')}
									className={cn({
										'focus-visible:ring-red-500': errors.currentPosition

									})}
									placeholder='Current position'
								/>
								{errors?.currentPosition && <p className='text-sm text-red-500 pt-2'>{errors.currentPosition.message}</p>}
							</div>
							<div className='grid gap-1 py-2'>
								<Label htmlFor='pretendedToBe'>
									<div className='flex gap-1 pb-1'>
										Pretended to be
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger onClick={(e) => e.stopPropagation()}>
													<MdInfoOutline />
												</TooltipTrigger>
												<TooltipContent>
													<p>Who would you like to be? What is your dream job?</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
								</Label>
								<Input
									{...register('pretendedToBe')}
									className={cn({
										'focus-visible:ring-red-500': errors.pretendedToBe

									})}
									placeholder='Pretended to be'
								/>
								{errors?.pretendedToBe && <p className='text-sm text-red-500 pt-2'>{errors.pretendedToBe.message}</p>}
							</div>
							<div className='grid gap-1 py-2'>
								<Label htmlFor='experience'>
									<div className='flex gap-1 pb-1'>
										Experience
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger onClick={(e) => e.stopPropagation()}>
													<MdInfoOutline />
												</TooltipTrigger>
												<TooltipContent>
													<p>Tell us about your experience in few sentences</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
								</Label>
								<Textarea
									{...register('experience')}
									className={cn({
										'focus-visible:ring-red-500': errors.experience

									})}
									placeholder='Experience'
								/>
								{errors?.currentPosition && <p className='text-sm text-red-500 pt-2'>{errors.currentPosition.message}</p>}
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
			</div>
		</MaxWidthWrapper>
	)
}

export default Page