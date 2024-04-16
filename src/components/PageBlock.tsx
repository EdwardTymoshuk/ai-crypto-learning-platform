import { cn } from '@/lib/utils'

const PageBlock = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return (
		<div className={cn('flex flex-col items-center justify-center w-full h-fit rounded-lg bg-opacity-50 bg-zinc-800 shadow-md', className)}>
			{children}
		</div>
	)
}

export default PageBlock
