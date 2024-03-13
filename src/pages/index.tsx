import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Home = () => {
  const router = useRouter()

  const { data: session, status } = useSession()
  console.log(session, status)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign-in')
    }
  }, [status])

  return (
    <>
      <h1>Hi, {session?.user.email}</h1>
      <Button variant='secondary' onClick={() => signOut()}>Log out</Button>
    </>
  )
}

export default Home