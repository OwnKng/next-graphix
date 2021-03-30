import styled from 'styled-components'
import Link from 'next/link'
import { graphics } from '../db/controllers/index'
import { connectToDB } from '../db/connectToDB'
import { elevation, below } from '../components/styled/utilities'

import { Card } from '../components/styled/elements/Card'
import Visualisation from '../components/visualisations/Visualisation'

type HomeProps = {
  className: string,
  graphs: []
}

const Home = ({ className, graphs }: HomeProps) => (
  <div className={className}>
    <div className="hero">
      <h1>Graphix</h1>
      <span>Build and share beautiful, interactive and responsive graph with ease</span>
    </div>
    <div className="copy">
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
    <div className="list">
      <div className="left">
        <h2>created with graphix</h2>
      </div>
      <div className="right">
        <div className="grid">
          {graphs.map((graph) => (
            <Card className="card" key={graph._id}>
              <Link href={`/view/${graph._id}`}>
                <div>
                  <h3>{graph.title}</h3>
                  <div className="vizWrapper">
                    <Visualisation graph={graph} />
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export const getServerSideProps = async (context: object) => {
  await connectToDB()

  const results = await graphics.getGraphs(0)

  const graphs = results.graphics.map((doc) => {
    const graph = doc.toObject()
    return { ...graph, data: JSON.parse(graph.data) }
  })

  const { hasNextPage } = results

  return {
    props: { graphs, hasNextPage },
  }
}

export default styled(Home)`

span {
  font-size: 1.2rem;
}

.vizWrapper {
  position: relative;
  height: 450px;
}

.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}

h3 {
  margin: 0px 0px;
  padding: 0px 5px;
  width: calc(100% - 10px);
  border-bottom: 1px solid var(--color-border);
}

.card {
  display: flex;
  flex-direction: column;
  ${elevation[1]};
  background: var(--color-foreground);
  padding: 10px 0px;
}


.left {
  flex-basis: 500px;
}


.right {
  width: 100%;
}

.list {
  display: flex;
  padding: 20px 20px;
}


${below.med`
.list {
  display: grid;
  grid-template-columns: 1fr;
}

.grid {
  grid-template-columns: 1fr;
}

`};


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

h2 {
  position: relative;
  margin: 0px;
  color: var(--color-heading);
  text-transform: uppercase;
  padding: 0px 0px 40px 0px;
}

h2:before {
  content: "";
  position: absolute;
  width: 25%;
  height: 3px;
  top: 0px;
  left: 0px;
  background-color: var(--color-button);
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
