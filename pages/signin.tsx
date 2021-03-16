import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Button } from '../components/styled/elements/Button'

type signinProps = {
  className: string
}

const signin = ({ className }: signinProps) => {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/user')
    }
  }, [session, router])

  return (
    <div className={className}>
      <h2>Sign in</h2>
      <p>Sign into graphix</p>
      <Button onClick={() => signIn('github')}>
        Sign in via GitHub
      </Button>
    </div>
  )
}

export default styled(signin)`
  width: 100vw;
  min-height: 100vh;
  text-align: center;

  h2 {
    text-transform: uppercase;
  }
`
