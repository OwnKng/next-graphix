import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const signin = () => {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/create')
    }
  }, [session, router])

  return (
    <>
      <h2>Sign in</h2>
      <button onClick={() => signIn('github')}>
        Sign in via GitHub
      </button>
    </>
  )
}

export default signin
