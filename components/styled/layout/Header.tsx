/* eslint-disable react/button-has-type */
import styled from 'styled-components'
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import { elevation } from '../utilities'

interface HeaderProps {
  className: string
}

const Header = ({ className }: HeaderProps) => {
  const [session] = useSession()

  return (
    <header className={className}>
      <div className="menuWrapper">
        <Link href="/">
          <h1>graphix</h1>
        </Link>
        <div className="menu">
          <Link href="/discover">
            Discover
          </Link>
          <Link href="/charts">
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
      </div>
    </header>
  )
}

export default styled(Header)`
  background: var(--color-primary);
  color: var(--color-heading);
  position: sticky;
  top: 0px;
  width: 100%;
  ${elevation[1]};
  z-index: var(--levels-highest);

  .menuWrapper {
    width: 95%;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
    place-items: center;

    h1 {
      margin: 0px;
      text-transform: uppercase;
      cursor: pointer;
    }

    a {
      color: var(--color-heading);
      padding: 0px 0px 0px 20px;
      text-decoration: none;
    }

    button {
      border: none;
      background: none;
      position: relative;
      color: var(--color-heading);
      cursor: pointer;
      padding: 0px 0px 0px 20px;

      :focus {
        outline: none;
      }
      :hover {
        color: var(--color-button);
      }

  }
`
