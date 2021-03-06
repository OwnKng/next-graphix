import { NextApiResponse, NextApiRequest } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default (req : NextApiRequest, res : NextApiResponse) => NextAuth(req, res, {
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  database: process.env.DATABASE_URL,
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async session(session, user) {
      session.user.id = user.id
      return session
    },
    async jwt(tokenPayload, user, account, profile, isNewUser) {
      if (tokenPayload && user) {
        return { ...tokenPayload, id: `${user.id}` }
      }

      return tokenPayload
    },
  },
})
