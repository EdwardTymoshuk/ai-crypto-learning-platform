import Link from 'next/link'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { SiStarship } from 'react-icons/si'
import NavBar from './NavBar'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const AsideNavBar = () => {
	const [isCardVisible, setCardVisible] = useState(true)

	const handleClose = () => {
		setCardVisible(false)
	}

	return (
		<div className='hidden md:fixed md:flex border-r min-h-screen max-h-screen w-full flex-col gap-2 border-zinc-800 bg-background max-w-60 z-20'>
			<div className='flex h-14 items-center border-b p-4 lg:h-14 lg:px-6 justify-center'>
				<Link href='/' className='flex items-center gap-2 font-semibol'>
					{/* <Image src='/images/logo.png' alt='logo' width={96} height={96} /> */}
					<div className='flex flex-row items-center gap-2'><span className='text-primary'>Astro</span><SiStarship size={24} className='text-primary' /><span className='text-secondary'>Genius.</span></div>
				</Link>
			</div>
			<div className='flex-1 p-4'>
				<NavBar />
			</div>
			{isCardVisible && (
				<div className='p-4'>
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
		</div>
	)
}

export default AsideNavBar
