import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MENU_ITEMS, MENU_ITEMS_TYPE } from '@/config'
import Link from 'next/link'

const NavBar = () => {
	return (
		<nav className="flex flex-col flex-1 text-sm text-text-primary font-medium w-full">
			{MENU_ITEMS.map((item: MENU_ITEMS_TYPE, index: number) => (
				!item.sub?.length ?
					<Link
						key={index}
						href="#"
						className="flex items-center gap-2 w-full rounded-lg py-2 text-text-primary hover:text-primary transition-all "
					>
						{<item.icon className='h-4 w-4' />}
						{item.name}
					</Link> :
					<Link
						key={index}
						href="#"
						className="flex items-center gap-2 w-full rounded-lg py-2 text-text-primary hover:text-primary transition-all "
					>
						<Accordion type="single" collapsible >
							<AccordionItem value={`item-${index}`} className='border-none'>
								<div className='flex flex-row gap-2'>
									{<item.icon className='h-4 w-4' />}<AccordionTrigger className='p-0 gap-2 hover:no-underline transition-none'>{item.name}</AccordionTrigger>
								</div>
								<AccordionContent>
									{
										item.sub?.map(item => (
											<Link
												key={index}
												href="#"
												className="flex items-center gap-2 w-full rounded-lg py-2 px-6 text-text-primary/80 hover:text-primary transition-all "
											>
												{item}
											</Link>
										))
									}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</Link>
			))}
		</nav>
	)
}

export default NavBar
