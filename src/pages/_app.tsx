import { cn } from '@/lib/utils'
import "@/styles/globals.css"
import { api } from "@/utils/api"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import { Inter } from "next/font/google"
import Head from 'next/head'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] })

function MyApp({ Component, pageProps }: AppProps) {
  const { session } = pageProps

  return (
    <>
      <Head>
        <title>Super Duper Studnt App</title>
        <meta name="description" content="Super Duper Studnt App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <main className={cn(inter, 'relative flex flex-col min-h-screen')}>
          <div className='flex-grow flex-1'>
            <Component {...pageProps} />
          </div>
        </main>
      </SessionProvider>
      <Toaster position='top-center' richColors />
    </>
  )
}

export default api.withTRPC(MyApp)
