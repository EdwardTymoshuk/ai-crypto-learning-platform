import { cn } from '@/lib/utils'
import { Fragment } from 'react'
import { BsCheck } from 'react-icons/bs'

const ProgressLine = ({ page, isCompleted }: { page: number, isCompleted: boolean }) => {
    const totalPages = 4
    return (
        <div className='flex py-12 flex-row w-4/5 mx-auto gap-3'>
            <div className='w-full mx-auto my-4'>
                <div className='flex pb-3 mx-auto'>

                    {[...Array(totalPages)].map((_, index) => (
                        <Fragment key={index}>
                            <div className='flex'>
                                <div className={`w-8 h-8 ${index >= page ? 'bg-white border-2 border-grey-600' : 'bg-secondary-foreground'} rounded-full text-sm  flex items-center justify-center -mx-2`}>
                                    {index < page - 1 && <BsCheck className='text-white' />}
                                    {index === page - 1 && <span className='text-gray-300'>{index + 1}</span>}
                                    {index > page - 1 && <span className='text-gray-300'>{index + 1}</span>}
                                </div>
                            </div>
                            {index < totalPages - 1 && (
                                <div className='w-1/3 align-center items-center align-middle content-center flex'>
                                    <div className='w-full bg-gray-300 items-center align-middle align-center flex-1 ml-2'>
                                        <div className={cn('bg-secondary-foreground text-x leading-none py-[0.125rem] text-center w-0', {
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
