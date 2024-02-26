import { Fragment, useState } from 'react'
import { BsCheck } from 'react-icons/bs'

const ProgressLine = ({page, isCompleted}: {page: number, isCompleted: boolean}) => {
	return (
		<div className='flex py-12 flex-row w-4/5 mx-auto gap-3'>
			<div className='w-full mx-auto my-4'>
				<div className='flex pb-3 mx-auto'>

            {[...Array(page+1)].map((_, index) => (
                <Fragment key={index}>
                    <div className='flex'>
                        <div className={`w-8 h-8 ${index === page ? 'bg-white border-2 border-grey-600' : 'bg-secondary-foreground'} rounded-full text-lg  flex items-center justify-center -mx-2`}>
                            {index === page ? <span className='text-gray-300'>{page+1}</span> : index === page-1 && !isCompleted ? <span className='text-gray-300'>{page}</span> : <BsCheck className='text-white' />}
                        </div>
                    </div>
                    {index < page && (
                        <div className='w-1/3 align-center items-center align-middle content-center flex'>
                            <div className='w-full bg-gray-300 items-center align-middle align-center flex-1'>
                                <div className={`bg-secondary-foreground text-xs leading-none py-[0.125rem] text-center ${index === page-1 && !isCompleted ? 'w-[8px]' : index === page-1 && isCompleted ? 'w-1/2' : 'w-full' }`}></div>
                            </div>
                        </div>
                    )}
                </Fragment>
            ))}

				</div>

			</div>

		</div>
	)
}

export default ProgressLine
