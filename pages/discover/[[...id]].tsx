import styled from 'styled-components'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ThumbsUp } from '@styled-icons/feather/ThumbsUp'
import Visualisation from '../../components/visualisations/Visualisation'
import { elevation } from '../../components/styled/utilities'
import { Card } from '../../components/styled/elements/Card'
import { Button } from '../../components/styled/elements/Button'
import { graphics } from '../../db/controllers/index'

type DiscoverProps = {
  className: string,
  graphs: any[]
}

const Discover = ({ className, graphs }: DiscoverProps) => {
  console.log(graphs)

  const likeChart = async (_id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST || ''}/api/likes/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
        <div className="right">
          {graphs && (
          <div className="grid">
            {graphs.map((graph) => (
              <Card className="card">
                <Link href={`/discover/${graph._id}`}>
                  <div>
                    <h3>{graph.title}</h3>
                    <div className="vizWrapper">
                      <Visualisation key={graph._id} graph={graph} />
                    </div>
                  </div>
                </Link>
                <div className="action">
                  {graph.likes}
                  <ThumbsUp
                    size="30"
                    onClick={() => {
                      likeChart(graph._id)
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>
          )}
          <div className="pagination" />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context: object) => {
  const props: any = {}
  const results = await graphics.getCharts(context.params.id || undefined)

  const graphs = results.map((doc) => {
    const graph = doc.toObject()
    return { ...graph, data: JSON.parse(graph.data) }
  })

  props.graphs = graphs

  return {
    props,
  }
}

export default styled(Discover)`
  min-height: 100vh;
  margin: 0px auto;
  border: 1px solid var(--colors-border);

  .hero {
    background: var(--color-button);
    padding: 100px 0px;
  }

  .action {
    border-top: 1px solid var(--color-border);
    padding: 5px;

    svg:hover {
      color: var(--color-button);
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

  @media only screen and (max-width: 600px) {
    .list {
      display: grid;
      grid-template-columns: 1fr;
    }

    .grid {
      grid-template-columns: 1fr;
    }
  }


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
