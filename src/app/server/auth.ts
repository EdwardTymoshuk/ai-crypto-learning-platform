
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { type GetServerSidePropsContext } from "next"
import {
  getServerSession,
  type DefaultSession
} from "next-auth"


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string,
      email: string
      password: string
      role?: string
      name?: string
      surname?: string
      plan?: number
      industry?: string
      position?: string
      pretendedToBe?: string
      experience?: string
      image?: string
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
    plan?: number
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
