import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { PlusCircle } from '@styled-icons/boxicons-regular/PlusCircle'
import { ThumbsUp } from '@styled-icons/feather/ThumbsUp'
import { DeleteOutline } from '@styled-icons/material/DeleteOutline'
import Visualisation from './visualisations/Visualisation'
import { Card } from './styled/elements/Card'
import { elevation } from './styled/utilities'

type GraphListProps = {
  className: string,
  graphs: any[],
  deleteChart: (_id: string) => void,
  likeChart: (_id: string) => void
}

const GraphList = ({
  graphs, deleteChart, className, likeChart,
}: GraphListProps) => {
  const router = useRouter()

  return (
    <div className={className}>
      <div className="inner">
        <div className="left">
          <h2>Your graphs</h2>
        </div>
        <div className="right">
          <button className="createButton" onClick={() => router.push('/create')}>
            <PlusCircle size="200px" />
            <h3>New graph</h3>
          </button>
          {graphs.map((graph) => (
            <Card key={graph._id}>
              <Link href={`/discover/${graph._id}`}>
                <div>
                  <div className="title">
                    <h3>{graph.title}</h3>
                  </div>
                  <div className="vizWrapper">
                    <Visualisation graph={graph} />
                  </div>
                </div>
              </Link>
              <div className="actions">
                <div>
                  <span>{graph.likes}</span>
                  <ThumbsUp className="like" onClick={() => likeChart(graph._id)} size="30" />
                </div>
                <DeleteOutline className="bin" size="30" onClick={() => deleteChart(graph._id)} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default styled(GraphList)`
  background: var(--color-primary);
  padding: 20px 0px;

  .inner {
    display: flex;
    padding: 20px 20px;
  }

  .left {
    flex-basis: 500px;
  }

  .right {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  @media only screen and (max-width: 600px) {
    .inner {
      display: grid;
      grid-template-columns: 1fr;
    }

    .right {
      grid-template-columns: 1fr;
    }
  }

  span {
    color: var(--color-button);
  }

  .like {
    :hover {
      color: var(--color-button);
    }
  }

  .bin {
    :hover {
      color: var(--color-accent);
    }
  }

  h2 {
    position: relative;
    margin: 0px;
    color: var(--color-heading);
    text-transform: uppercase;
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

  .createButton {
    min-height: 500px;
    background: var(--color-foreground);
    color: var(--color-button);
    border: none;
    ${elevation[1]};
    border: 1px solid var(--color-border);
  }

  .createButton:hover {
    color: var(--color-button-highlight);
  }

  .title {
    padding: 10px 20px;
    border-bottom: 1px solid var(--color-border);

    h3 {
      margin: 0px;
    }
  }

  .actions {
    display: flex;
    padding: 10px 20px;
    border-top: 1px solid var(--color-border);
    justify-content: space-between;
  }


  
  .vizWrapper {
    position: relative;
    height: 450px;
    width: calc(100% - 2px);
    margin: 0px auto;
  }

  a {
    display: block;
    font-size: 2rem;
    text-decoration: none;
    color: var(--color-paragraph);
  }
`
