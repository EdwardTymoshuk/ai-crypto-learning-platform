import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { type GetServerSidePropsContext } from "next"
import {
  getServerSession,
  type DefaultSession
} from "next-auth"


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string,
      email: string,
      password: string,
      role: string,
      image: string,
      isCompleted: boolean
    },
    session: Session,
    token: string
  }

  export interface TUser {
    id: string,
    email: string
    password: string
    role?: string
    name?: string
    surname?: string
    industry?: string
    position?: string
    pretendedToBe?: string
    experience?: string
    image?: string
    isCompleted: boolean
  }
}


export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
