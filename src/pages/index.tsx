import { Button } from '@/components/ui/button'
import User from '@/server/db/models/Users'
import connectMongoDB from '@/server/db/mongodb'
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

  const session = await getSession(context)
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
    connectMongoDB()
    const user = await User.findOne({ email: userEmail }).then(res => JSON.parse(JSON.stringify(res)))
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
      props: { user },
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
