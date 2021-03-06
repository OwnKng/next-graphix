/* eslint-disable react/button-has-type */
import styled from 'styled-components'
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

interface HeaderProps {
  className: string
}

const Header = ({ className }: HeaderProps) => {
  const [session] = useSession()

  return (
    <header className={className}>
      <Link href="/">
        <h1>graphix</h1>
      </Link>
      <div className="menu">
        <Link href="/discover">
          Discover
        </Link>
        <Link href="/create">
          Create
        </Link>
        {session ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <Link href="/signin">
            Sign In
          </Link>
        )}
      </div>
    </header>
  )
}

export default styled(Header)`
  background: var(--color-background);
  position: sticky;
  top: 0px;
  width: 100%;

  h1 {
    margin: 0px;
    padding: 0px 0px 0px 20px;
    text-transform: uppercase;
  }

  .menu {
    display: flex;
    justify-content: space-between;
    place-items: center;
    padding: 0px 10%;

    a {
      color: var(--color-paragraph);
    }
  }
`
