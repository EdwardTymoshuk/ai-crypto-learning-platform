'use client'

import { api } from '@/app/_trpc/client'
import { useUser } from '@/app/context/UserContext'
import { useQuery } from '@tanstack/react-query'
import { Session } from 'next-auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import AsideNavBar from './AsideNavBar'
import Header from './Header'

import { formatPrice } from '@/lib/utils'
import { GiUpgrade } from "react-icons/gi"


const HomeComponent = ({ session }: { session: Session | null }) => {
  const router = useRouter()
  const { user, setUser } = useUser()

  if (!session) console.log('No session')

  const email = session?.user.email || ''
  if (!email) console.log('No email')

  const { data, status } = useQuery(['user', email], () => api.user.getUser.useQuery(email))

  if (status === 'success' && !user) setUser(data?.data || null)

  if (user && (!user.isCompleted || user.isCompleted === null)) {
    router.push('/plans')
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] text-white max-h-screen">
      <div className="hidden border-r border-zinc-800 bg-muted/40 md:block bg-[#221C3E]">
        <AsideNavBar />
      </div>
      <div className='flex flex-col overflow-auto'>
        <Header user={session?.user} />
        <div className='flex flex-col px-8 bg-gradient-to-tr from-[#0368FF] to-[#FF3E95] h-screen'>
          <div className='text-2xl font-bold p-4'>
            <h2>Profile page</h2>
          </div>
          <div className='flex flex-row gap-4 h-full'>
            <div className='flex justify-center w-full h-fit rounded-lg bg-opacity-50 bg-zinc-800 shadow-md'>
              <div className="w-full text-gray-50 transition-shadow shadow-xl hover:shadow-xl min-w-max">
                <div className="w-full h-48 bg-gray-800 rounded-lg relative">
                  <Image src='/images/profile-wallpaper.jpeg' alt='wallpaper' fill objectFit='cover' className='rounded-t-lg' />
                </div>
                <div
                  className="h-48 w-48 relative -top-24 mx-auto rounded-full items-end justify-end text-purple-400 flex bg-[#FF3E95] ring-4 ring-premium">
                  <Image className="rounded-full relative" src="/images/avatar.jpg" height={192} width={192} alt="avatar" />
                </div>
                <div className="flex items-center p-4">
                  <div className="relative flex flex-col items-center w-full">
                    <div className="flex flex-col space-y-1 justify-center items-center -mt-12 w-full">
                      <span className="text-md whitespace-nowrap text-white font-bold">Edward</span>
                      <span className="text-md whitespace-nowrap text-gray-200">edward.tymoshuk.dev@gmail.com</span>
                      <p className="text-sm text-gray-300 italic">
                        "Let&apos;s do something greate"
                      </p>
                      <div className="py-2 flex space-x-2">
                        <button className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max border bg-transparent border-purple-400 text-purple-400 hover:border-purple-800px-4 py-1 items-center hover:shadow-lg"><span className="mr-2"></span>Edit profile<span className="ml-2"></span></button>
                        <button className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  focus:border-blue-300 rounded max-w-max text-gray-100 bg-[#ff3e95] hover:bg-green-600 px-4 py-1 items-center hover:shadow-lg"><span className="mr-2"><GiUpgrade /></span>Upgrade plan <span className="ml-2"></span></button>
                      </div>
                      <div
                        className="py-4 flex justify-center items-center w-full divide-x divide-gray-400 divide-solid">
                        <span className="text-center px-2"><span className="font-bold text-gray-50">56</span><span className="text-gray-100"> followers</span></span><span className="text-center px-2"><span className="font-bold text-gray-50">112</span><span className="text-gray-100"> following</span></span><span className="text-center px-2"><span className="font-bold text-gray-50">27</span><span className="text-gray-100"> repos</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-3/4 gap-4'>
              <div className='flex flex-col p-8 justify-center items-center w-full h-fit rounded-lg bg-opacity-50 bg-zinc-800 shadow-md border-b-8 border-[#ff3e95]'>
                <div className='flex justify-center'>
                  <span className='text-gray-200'>Wallet balance</span>
                </div>
                <div>
                  <span className='font-bold text-4xl'>
                    {formatPrice(14500)}
                  </span>
                </div>
              </div>
              <div className='flex flex-col p-8 justify-center items-center w-full h-fit rounded-lg bg-opacity-50 bg-zinc-800 shadow-md border-b-8 border-vip'>
                <div>
                  <span className='text-gray-200'>Membership status</span>
                </div>
                <div className='font-bold text-4xl'>
                  <span className='text-vip'>VIP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent
