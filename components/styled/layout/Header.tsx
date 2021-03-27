/* eslint-disable react/button-has-type */
import styled from 'styled-components'
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { elevation } from '../utilities'

interface HeaderProps {
  className: string
}

const Header = ({ className }: HeaderProps) => {
  const [session] = useSession()
  const router = useRouter()

  const getPath = () => {
    let url = router.pathname
    url = url.split('/')
    return url[1]
  }

  return (
    <header className={className}>
      <div className="logoWrapper">
        <div className="logo">
          <Link href="/">
            <h1>graphix</h1>
          </Link>
          {session ? (
            <div className="account">
              <img src={session.user.image} alt="profile" />
              <button onClick={() => signOut()}>Sign out</button>
            </div>
          ) : (
            <div className="account">
              <Link href="/signin">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="menuWrapper">
        <div className="menu">
          <Link href="/discover">
            <a className={getPath() === 'discover' ? 'activePath' : ''}>
              Discover
            </a>
          </Link>
          <Link href="/create">
            <a className={getPath() === 'create' ? 'activePath' : ''}>
              Create
            </a>
          </Link>
          <Link href="/user">
            <a className={getPath() === 'user' ? 'activePath' : ''}>
              My Graphix
            </a>
          </Link>
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
  border-bottom: 1px solid var(--color-border);
  ${elevation[1]};
  z-index: var(--levels-highest);
  width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    place-items: center;

    .account {
      display: flex; 
      padding: 0px 10px;
      justify-content: space-between;
      align-items: center;
    }

    .logoWrapper {
      width: 100%;
      border-bottom: 1px solid var(--color-foreground);
    }

    .activePath {
      color: var(--color-button);
    }

    .logo {
      margin: 0px auto;
      width: calc(100% - 20px);
      padding: 10px 0px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      a {
        padding: 0px;
        margin: 0px;
      }
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin: 0px 10px 0px 0px;
      border: 1px solid var(--color-button);
    }

    @media only screen and (max-width: 600px) {
      .logo {
        width: calc(100% - 10px);
      }
    }

  .menuWrapper {
      width: 100%;
  }

  .menu {
    width: 100%;
    max-width: 820px;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
  }

    h1 {
      margin: 0px;
      text-transform: uppercase;
      cursor: pointer;
      line-height: 1;
    }

    a {
      color: var(--color-heading);
      font-size: 1.1rem;
      padding: 5px 0px;
      text-decoration: none;
      width: 100%;
      text-align: center;

      :hover {
        color: var(--color-button);
      }
    }

    button {
      border: none;
      background: none;
      position: relative;
      color: var(--color-heading);
      cursor: pointer;
      padding: 0px;
    
      :focus {
        outline: none;
      }
      :hover {
        color: var(--color-button);
      }

  
`
