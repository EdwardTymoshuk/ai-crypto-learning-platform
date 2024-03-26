'use client'

import { api } from '@/app/_trpc/client'
import { useUser } from '@/app/context/UserContext'
import SignOutButton from '@/components/SignOutButton'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const HomeComponent = ({ session }: { session: Session | null }) => {
  const router = useRouter()
  const { user, setUser } = useUser()
  const email = session?.user.email || ''
  const { data: fetchedUser, status } = api.user.getUser.useQuery(email)

  useEffect(() => {
    if (user && !user.isCompleted) {
      router.push('/plans')
    }
    if (status === 'success' && !user) setUser(fetchedUser)

  }, [user, status, fetchedUser, router, setUser])

  return (
    <div>
      <h1>Hello, {user?.name || user?.email}</h1>
      <SignOutButton variant='secondary' />
    </div>
  )
}

export default HomeComponent