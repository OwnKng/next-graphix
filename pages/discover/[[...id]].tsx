import styled from 'styled-components'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { ThumbsUp } from '@styled-icons/feather/ThumbsUp'

// Visualisation component, which displays the graph
import Visualisation from '../../components/visualisations/Visualisation'

// Styled elements
import { elevation, below } from '../../components/styled/utilities'
import { Card } from '../../components/styled/elements/Card'
import { Button } from '../../components/styled/elements/Button'

// For the server-side code
import { graphics } from '../../db/controllers/index'
import { connectToDB } from '../../db/connectToDB'

type DiscoverProps = {
  className: string,
  hasNextPage: boolean,
  graphs: any[],
  offset: number
}

const Discover = ({
  className, graphs, hasNextPage, offset,
}: DiscoverProps) => {
  const router = useRouter()

  // Sends a PUT request to the API route for handling likes
  const likeGraph = async (_id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST || ''}/api/likes/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) router.reload()
  }

  return (
    <div className={className}>
      <div className="hero">
        <h1>Created with GRAPHIX</h1>
      </div>
      <div className="list">
        <div className="left">
          <h2>Most liked graphix</h2>
        </div>
        {/* Map through each graph */}
        <div className="right">
          {graphs && (
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
                <div className="action">
                  <div style={{ display: 'flex' }}>
                    <span style={{ marginRight: 5 }}>{graph.likes}</span>
                    <button className="like">
                      <ThumbsUp onClick={() => likeGraph(graph._id)} size="30" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          )}
          {/* If the hasNextPage prop is true, return a button to push to the next set of graphs */}
          <div className="pagination">
            {hasNextPage && (
              <Button onClick={() => router.push(`/discover/${offset + 8}`)}>Load more</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: object) => {
  // detects whether there is an offset in the page url (e.g. discover/8)
  const pageOffset = context.params.id || undefined

  // Connects to the database
  await connectToDB()

  // Get the graphs
  const results = await graphics.getGraphs(pageOffset)

  // Tidy the data before it's passed to the component
  const graphs = results.graphics.map((doc) => {
    const graph = doc.toObject()
    return { ...graph, data: JSON.parse(graph.data) }
  })

  // de-structure hasNextPage from the results
  const { hasNextPage } = results

  // Return props to the component
  return {
    props: { graphs, hasNextPage, offset: pageOffset || 0 },
  }
}

export default styled(Discover)`
  min-height: 100vh;
  margin: 0px auto;
  border: 1px solid var(--colors-border);

  .hero {
    padding: 100px 0px;
    background: rgb(246,111,25);
    background: linear-gradient(to bottom right, rgba(246,111,25,1) 10%, #5887FF 100%);
  }

  .action {
    border-top: 1px solid var(--color-border);
    padding: 5px;
  }

  .like {
    background: var(--color-button);
    border-radius: 50%;
    padding: 4px;
    outline: none;
    color: var(--color-heading);
    border: 1px solid var(--color-heading);
    :hover {
      background: var(--color-button-hover);
    }
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

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
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

  h1 {
    text-transform: uppercase;
    text-align: center;
    margin: 0px auto;
  }

  h3 {
    margin: 0px 0px;
    padding: 0px 5px;
    width: calc(100% - 10px);
    border-bottom: 1px solid var(--color-border);
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

  select {
    display: block;
    padding: 5px;
    min-width: 250px;
  }

  .card {
    display: flex;
    flex-direction: column;
    ${elevation[1]};
    background: var(--color-foreground);
    padding: 10px 0px;
  }

  .vizWrapper {
    position: relative;
    height: 450px;
  }

  a {
    display: block;
    font-size: 1.4rem;
    text-decoration: none;
    color: var(--color-paragraph);
  }

  .pagination {
    margin: 20px 0px;
    border-top: 1px solid var(--color-border);
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
  }
`
