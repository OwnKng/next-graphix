import styled from 'styled-components'
import Link from 'next/link'
import { ThumbsUp } from '@styled-icons/feather/ThumbsUp'
import { elevation } from './styled/utilities'
import { Card } from './styled/elements/Card'
import Visualisation from './visualisations/Visualisation'

type LikedChartsProps = {
    liked: object,
    className: string
}

const LikedCharts = ({ liked, like, className }: LikedChartsProps) => (
  <div className={className}>
    <div className="inner">
      <div className="left">
        <h2>Liked charts</h2>
      </div>
      <div className="right">
        {liked.length ? (
          liked.map((graph) => (
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
                  <ThumbsUp size="30" onClick={() => like(graph._id)} />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <span>You haven't like any charts yet...</span>
        )}
      </div>
    </div>
  </div>
)

export default styled(LikedCharts)`
    background: var(--color-background);
    padding: 20px 0px;
  
    .inner {
      display: flex;
      padding: 20px 20px;
    }
  
    h2 {
      position: relative;
      margin: 0px;
      color: var(--color-paragraph);
      text-transform: uppercase;
    }
  
    h2:before {
      content: "";
      position: absolute;
      width: 25%;
      height: 3px;
      top: 0px;
      left: 0px;
      background-color: var(--color-accent);
    }
  
    .createButton {
      background: var(--color-foreground);
      color: var(--color-button);
      border: none;
      ${elevation[1]}
    }
  
    .createButton:hover {
      color: var(--color-button-highlight);
    }
  
    .title {
      padding: 10px 20px;
      background: var(--color-middleground);
  
      h3 {
        margin: 0px;
      }
    }
  
    .actions {
      display: flex;
      padding: 10px 20px;
      background: var(--color-middleground);
      justify-content: space-between;
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
    
    .vizWrapper {
      position: relative;
      height: 400px;
    }
  
    a {
      display: block;
      font-size: 2rem;
      text-decoration: none;
      color: var(--color-paragraph);
    }
`
