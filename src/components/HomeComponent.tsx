'use client'

import { api } from '@/app/_trpc/client'
import { useUser } from '@/app/context/UserContext'
import SignOutButton from '@/components/SignOutButton'
import { useQuery } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'

const HomeComponent = ({ session }: { session: Session | null }) => {
  const router = useRouter()
  const { user, setUser } = useUser()

  if (!session) console.log('No session')

  const email = session?.user.email || ''
  if (!email) console.log('No email')

  const { data, status } = useQuery(['user', email], () => api.user.getUser.useQuery(email))

  if (status === 'loading') return (
    <div>
      <p>Loading user...</p>
    </div>
  )

  if (status === 'success' && !user) setUser(data?.data || null)

  if (user && (!user.isCompleted || user.isCompleted === null)) {
    router.push('/plans')
  }

  return (
    <div>
      <h1>Hello, {session?.user.name || email || user?.name || user?.email}</h1>
      <SignOutButton variant='secondary' />
    </div>
  )
}

export default HomeComponent
