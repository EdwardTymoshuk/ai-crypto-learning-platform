import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { TUser } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { GiAstronautHelmet } from 'react-icons/gi'
import { MdClose, MdLogout, MdMenu, MdOutlineLocalPostOffice } from 'react-icons/md'
import { SiStarship } from "react-icons/si"
import NavBar from './NavBar'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { DropdownMenuGroup } from './ui/dropdown-menu'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

const Header = ({ user }: { user: TUser | null | undefined }) => {
	const [isCardVisible, setCardVisible] = useState(true)
	const [isActiveProfile, setIsActiveProfile] = useState(true)

	const handleClose = () => {
		setCardVisible(false)
	}
	return (
		<header className='fixed flex flex-row bg-background justify-between md:justify-end h-14 items-center gap-4 border-b px-4 w-full z-10'>
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant='transparent'
						size='icon'
						className='shrink-0 md:hidden border-0 rounded-full'
					>
						<MdMenu className='h-5 w-5' />
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='flex flex-col'>
					<Link
						href='#'
						className='flex items-center gap-2 text-lg font-semibold'
					>
						{/* <Image src='/images/logo.png' alt='logo' width={150} height={150} /> */}
						<div className='flex flex-row items-center gap-2'><span className='text-primary'>Astro</span><SiStarship size={24} className='text-primary' /><span className='text-secondary'>Genius.</span></div>
					</Link>
					<NavBar />
					{isCardVisible && (
						<div className='p-4 flex justify-end'>
							<Card className='text-center group'>
								<div className='flex justify-end p-2'>
									<button onClick={handleClose}><MdClose /></button>
								</div>
								<CardHeader className='pt-2'>
									<CardTitle>Upgrade plan</CardTitle>
									<CardDescription className='text-text-primary'>
										Unlock all features and get unlimited access to our support
										team.
									</CardDescription>
								</CardHeader>
								<CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
									<Button size='sm' className='w-full bg-secondary'>
										Upgrade
									</Button>
								</CardContent>
							</Card>
						</div>
					)}
				</SheetContent>
			</Sheet>
			<div className='flex flex-row gap-2 items-center z-10'>
				<div>
					<Button
						variant='link'
						className='p-2 w-auto h-auto border rounded-full border-transparent hover:border hover:border-primary hover:rounded-full hover:bg-primary active:bg-primary hover:text-text-primary'
					><MdOutlineLocalPostOffice size={22} /></Button>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='transparent'
							size='icon'
							className={cn('border rounded-full border-transparent hover:border')}
							onClick={() => setIsActiveProfile(!isActiveProfile)}
						>
							<GiAstronautHelmet className='h-5 w-5' />
							<span className='sr-only'>Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<div className='bg-background p-4 my-2 border rounded-md space-y-2 '>
							<DropdownMenuGroup className='py-2'>
								<DropdownMenuLabel className='text-base font-semibold'>Hi, {user?.name || 'Edward!'}</DropdownMenuLabel>
								<DropdownMenuLabel className='text-sm italic text-text-primary/60'>eduard.tymoshuk@gmail.com</DropdownMenuLabel>
							</DropdownMenuGroup>
							<Separator />
							<DropdownMenuGroup className='py-2 space-y-2'>
								<DropdownMenuItem className='text-sm hover:text-primary w-fit text-primary'><Link href='#'>My profile</Link></DropdownMenuItem>
								<DropdownMenuItem className='text-sm hover:text-primary w-fit'><Link href='#'>Settings</Link></DropdownMenuItem>
								<DropdownMenuItem className='text-sm hover:text-primary w-fit'><Link href='#'>Support</Link></DropdownMenuItem>
							</DropdownMenuGroup>
							<Separator />
							<DropdownMenuItem><Button onClick={() => signOut()} variant='link' className='flex flex-row gap-1 items-center text-danger hover:brightness-150 p-0 hover:no-underline'><MdLogout /> Logout</Button></DropdownMenuItem>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}

export default Header
