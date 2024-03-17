import { Button } from '@/components/ui/button'
import User from '@/server/db/models/Users'
import { GetServerSidePropsContext } from 'next'
import { TUser } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import secureLocalStorage from 'react-secure-storage'

const Home = ({ user }: { user: TUser }) => {
  const { data: session, status } = useSession()

  const userEmail = session?.user.email

  const handleSignOut = () => {
    signOut()
    secureLocalStorage.clear()
  }

  return (
    <>
      {!userEmail || status === 'loading' ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Hi, {user && user.name}</h1>
          <Button variant='secondary' onClick={() => handleSignOut()}>Log out</Button>
        </div>
      )}
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getSession } = await import('next-auth/react')
  const { api } = await import('@/utils/api')

  const session = await getSession(context)
  console.log('Session: ', session)
  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    }
  }

  const userEmail = session.user.email
  try {
    const user = await User.findOne({ email: userEmail })
    console.log('Response: ', user)
    if (!user) {
      throw new Error('Failed to fetch user data')
    }

    if (user && user.isCompleted === false) {
      return {
        redirect: {
          destination: '/plans',
          permanent: false,
        },
      }
    }

    return {
      props: { userEmail },
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    }
  }
}


export default Home
