import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Github } from '@styled-icons/bootstrap/Github'

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
      <div className="hero">
        <h1>Sign in to graphix</h1>
      </div>
      <button onClick={() => signIn('github')}>
        Sign in via GitHub
        {' '}
        <Github size={20} />
      </button>
    </div>
  )
}

export default styled(signin)`
  width: 100vw;
  min-height: 100vh;
  text-align: center;

  .hero {
    padding: 80px 0px;
    background: rgb(246,111,25);
    background: linear-gradient(to bottom right, rgba(246,111,25,1) 10%, #39999D 100%);
  }

  h1 {
    text-transform: uppercase;
  }

  h2 {
    text-transform: uppercase;
  }

  button {
    margin-top: 40px;
    font-size: 1.2rem;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid var(--color-heading);
    color: var(--color-paragraph);
    background: var(--color-background);
  }
`
