import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import HomeComponent from '@/components/HomeComponent'
import { getServerSession } from 'next-auth'

const Home = async () => {
  const session = await getServerSession(authOptions)
  return (
    <>
      <HomeComponent session={session} />
    </>
  )
}

export default Home