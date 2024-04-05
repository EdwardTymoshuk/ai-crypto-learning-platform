import { Home, Package, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const AsideNavBar = () => {
	return (
		<div className="flex h-full max-h-screen flex-col gap-2 bg-[#221C3E]">
			<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-center">
				<Link href="/" className="flex items-center gap-2 font-semibol">
					<Image src='/images/logo.png' alt='logo' width={100} height={100} />
				</Link>
			</div>
			<div className="flex-1">
				<nav className="grid items-start pl-10 px-2 text-sm font-medium lg:px-4">
					<Link
						href="#"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<Home className="h-4 w-4" />
						Home
					</Link>
					<Link
						href="#"
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
					>
						<ShoppingCart className="h-4 w-4" />
						Ai careera trainer
						{/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
							6
						</Badge> */}
					</Link>
					<Link
						href="#"
						className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
					>
						<Package className="h-4 w-4" />
						Marketplace
					</Link>
				</nav>
			</div>
			<div className="mt-auto p-4">
				<Card >
					<CardHeader className="p-2 pt-0 md:p-4">
						<CardTitle>Upgrade plan</CardTitle>
						<CardDescription>
							Unlock all features and get unlimited access to our support
							team.
						</CardDescription>
					</CardHeader>
					<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
						<Button size="sm" className="w-full bg-[#ff3e95]">
							Upgrade
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default AsideNavBar