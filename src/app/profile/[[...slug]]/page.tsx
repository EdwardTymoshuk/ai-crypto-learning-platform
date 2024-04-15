'use client'

import { useUser } from '@/app/context/UserContext'
import AsideNavBar from '@/components/AsideNavBar'
import Header from '@/components/Header'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import PageBlock from '@/components/PageBlock'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GiUpgrade } from 'react-icons/gi'
import { MdOutlineEdit } from "react-icons/md"


const Page = ({ params }: { params: { slug: string } }) => {
  const router = useRouter()
  const { user, setUser } = useUser()

  const [isEditing, setIsEditing] = useState(false)
  const [profileQuote, setProfileQuote] = useState(`Let's do something great`)

  console.log(params)

  return (
    <div className='flex min-h-screen w-full h-auto bg-gradient-to-tr from-gradient-primary-from to-gradient-primary-to'>
      <AsideNavBar />
      <Header user={user} />
      <MaxWidthWrapper>
        <div className='flex flex-col overflow-auto w-full md:pl-60 mt-14'>
          <div className='flex flex-col px-8 min-h-screen h-auto'>
            {/* <PageHeader title='Profile' /> */}
            <div className='flex flex-col lg:flex-row pt-4 gap-4 h-full'>
              <PageBlock>
                <div className='w-full transition-shadow shadow-xl hover:shadow-xl min-w-max'>
                  <div className='w-full h-48 bg-zinc-800 rounded-lg relative z-0'>
                    <Image src='/images/profile-wallpaper.jpeg' alt='wallpaper' fill objectFit='cover' className='rounded-t-lg' />
                    {isEditing && <Button variant='link' className='m-2 p-2 right-0 absolute hover:brightness-110'><MdOutlineEdit size={24} /></Button>}
                  </div>
                  <div
                    className='group h-48 w-48 relative -top-24 mx-auto rounded-full items-end justify-end flex bg-primary ring-4 ring-plan-vip'>
                    {isEditing &&
                      <div className='absolute z-10 w-full h-full bg-text-secondary rounded-full opacity-50 group-hover:opacity-60'>
                        <Button variant='link' className='w-full h-full mx-auto my-auto absolute group-hover:brightness-110'><MdOutlineEdit size={24} /></Button>
                      </div>
                    }
                    <Image className='rounded-full relative' src='/images/avatar.jpg' height={192} width={192} alt='avatar' />
                  </div>
                  <div className='flex items-center p-4'>
                    <div className='relative flex flex-col items-center w-full'>
                      <div className='flex flex-col space-y-1 justify-center items-center -mt-12 w-full'>
                        <span className='text-md whitespace-nowrap text-info font-bold'>Edward</span>
                        <span className='text-md whitespace-nowrap text-text-primary'>edward.tymoshuk.dev@gmail.com</span>
                        {!isEditing ?
                          <p className='text-sm text-text-primary/90 italic'>
                            {`"${profileQuote}"`}
                          </p> :
                          <Input value={profileQuote} onChange={(e) => setProfileQuote(e.target.value)} className='w-1/2' />
                        }

                        <div className='py-2 flex space-x-2'>
                          <Button variant='transparent' onClick={() => setIsEditing(!isEditing)}>{!isEditing ? 'Edit profile' : 'Save'}</Button>
                          <Button><GiUpgrade />Upgrade plan</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </PageBlock>
              <div className='flex flex-row lg:flex-col w-full lg:w-3/4 gap-4'>
                <PageBlock className='p-8 border-b-8 border-info'>
                  <div className='flex justify-center'>
                    <span className='text-text-primary'>Wallet balance</span>
                  </div>
                  <div>
                    <span className='font-bold text-4xl text-info'>
                      {formatPrice(14500)}
                    </span>
                  </div>
                </PageBlock>
                <PageBlock className='p-8 border-b-8 border-plan-vip'>
                  <div>
                    <span className='text-text-primary'>Membership status</span>
                  </div>
                  <div className='font-bold text-4xl'>
                    <span className='text-plan-vip'>VIP</span>
                  </div>
                </PageBlock>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Page
