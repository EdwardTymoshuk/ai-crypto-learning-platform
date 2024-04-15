const PageHeader = ({ title }: { title: string }) => {
	return (
		<h2 className='text-4xl font-bold text-text-primary py-4'>
			{title}
		</h2>
	)
}

export default PageHeader
