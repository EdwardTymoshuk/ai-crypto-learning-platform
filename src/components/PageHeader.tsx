const PageHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
	return (
		<div className='flex flex-col justify-start'>
			<h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl">
				{title}
			</h1>
			<h2 className="scroll-m-20 border-b pb-2 text-l lg:text-xl font-semibold tracking-tight first:mt-0 text-muted-foreground">
				{subtitle}
			</h2>
		</div>
	)
}

export default PageHeader
