import styled from 'styled-components'
import Link from 'next/link'

const Home = ({ className }) => (
  <div className={className}>
    <div className="hero">
      <h1>Graphix</h1>
      <h3>The Powerful Graph Creator</h3>
    </div>
    <div className="copy">
      <h4>Build and share beautiful, interactive and responsive graphics with ease</h4>
      <p>
        GRAPHIX is an experimental data visualisation app developed by
        {' '}
        <a href="http://ownkng.dev">Owen King</a>
        .
      </p>
      <p>
        It provides a powerful visual editor that allows you to construct interactive data visualisations and share them with the world.
      </p>
    </div>
    <Link href="/discover">
      <button>Discover Graphix</button>
    </Link>
    <Link href="/user">
      <button>Sign up</button>
    </Link>
  </div>
)

export default styled(Home)`
min-height: 100vh;

a {
  color: var(--color-button);
}

.hero {
    display: flex;
    flex-direction: column;
    padding: 80px 0px 20px;
    justify-items: flex-end;
    background: rgb(119,150,203);
    background: linear-gradient(to bottom right, rgba(119,150,203,1) 0%, #7DE2D1 100%);
    text-align: center;
}

h1 {
  text-transform: uppercase;
  margin: 0px auto;
}

.copy {
  width: calc(100% - 10px);
  max-width: 800px;
  margin: 0px auto;
  text-align: center;
}

button {
  font-size: 1.2rem;
  display: block;
  margin: 10px auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid var(--color-heading);
  color: var(--color-paragraph);
  background: var(--color-background);
}

`
