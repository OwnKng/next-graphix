import styled from 'styled-components'
import Link from 'next/link'
import { Button } from '../components/styled/elements/Button'

const Home = ({ className }) => (
  <div className={className}>
    <div className="hero">
      <h1>Graphix</h1>
      <h3>The Powerful Graph Creator</h3>
    </div>
    <div className="copy">
      <h4>Build beautiful, interactive and responsive graphics with ease</h4>
      <Link href="/discover">
        <Button>Discover Graphix</Button>
      </Link>
      <Link href="/user">
        <Button>Sign In</Button>
      </Link>
    </div>
  </div>
)

export default styled(Home)`
min-height: 100vh;

.hero {
    display: flex;
    flex-direction: column;
    padding: 80px 0px 20px;
    justify-items: flex-end;
    background: var(--color-button);
    text-align: center;
}

h1 {
  text-transform: uppercase;
  margin: 0px auto;
}

.copy {
  text-align: center;


  button {
    margin: 10px auto;
    display: block;
  }
}
`
