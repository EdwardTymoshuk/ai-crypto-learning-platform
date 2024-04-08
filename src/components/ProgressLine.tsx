import { cn } from '@/lib/utils'
import { Fragment } from 'react'
import { BsCheck } from 'react-icons/bs'

const ProgressLine = ({ page, isCompleted }: { page: number, isCompleted: boolean }) => {
    const totalPages = 3
    return (
        <div className='flex py-12 flex-row w-4/5 mx-auto gap-3'>
            <div className='w-full mx-auto my-4'>
                <div className='flex pb-3 mx-auto'>

                    {[...Array(totalPages)].map((_, index) => (
                        <Fragment key={index}>
                            <div className='flex'>
                                <div className={`w-8 h-8 ${index >= page ? 'bg-gray-300 border-2 border-gray-300' : 'bg-primary'} rounded-full text-sm  flex items-center justify-center -mx-2`}>
                                    {index < page - 1 && <BsCheck className='text-text-primary' />}
                                    {index === page - 1 && <span className='text-text-primary'>{index + 1}</span>}
                                    {index > page - 1 && <span className='text-text-secondary'>{index + 1}</span>}
                                </div>
                            </div>
                            {index < totalPages - 1 && (
                                <div className='w-1/2 align-center items-center align-middle content-center flex'>
                                    <div className='w-full bg-gray-300 items-center align-middle align-center flex-1 ml-2'>
                                        <div className={cn('bg-primary text-x leading-none py-[0.125rem] text-center w-0', {
                                            'w-full': index < page - 1,
                                            'w-1/2': index === page - 1 && isCompleted,
                                        })}></div>
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
