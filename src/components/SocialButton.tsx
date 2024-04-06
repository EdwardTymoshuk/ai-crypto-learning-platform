import React, { ReactElement } from 'react'
import { Button } from './ui/button'

interface SocialButtonProps {
	icon: {
		element: ReactElement,
		size?: number
	}
	onClickHandler: () => void
}

const SocialButton = ({ icon, onClickHandler }: SocialButtonProps) => {
	const { element, size = 24 } = icon

	return (
		<Button
			className='group text-sm flex flex-row items-center justify-center gap-1 flex-1 py-2 rounded-lg bg-transparent border hover:bg-primary'
			onClick={onClickHandler}
		>
			{React.cloneElement(element, { size, className: 'text-primary group-hover:text-text-primary' })}
		</Button>
	)
}

export default SocialButton
