'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Home = () => {
    const router = useRouter()
    const user = null

    useEffect(() => {
        if (!user) {
            router.push('/sign-in')
        }
    }, [user, router])

    return (
		<div>
		{user ? <p>Hi {user}!</p> : <p>Please sign in</p>}
	</div>
	)
}

export default Home