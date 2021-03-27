import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { ThumbsUp } from '@styled-icons/feather/ThumbsUp'
import styled from 'styled-components'
import Visualisation from './Visualisation'
import { Card } from '../styled/elements/Card'
import { below } from '../styled/utilities'

const VisualisationGrid = ({ graphs, className }) => {
  const router = useRouter()
  const [session] = useSession()

  const likeGraph = async (_id: string) => {
    if (!session) router.push('/signin')
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
      {graphs.map((graph) => (
        <Card className="card">
          <Link href={`/view/${graph._id}`}>
            <div>
              <div className="graphTitle">
                <h3>{graph.title}</h3>
              </div>
              <div className="vizWrapper">
                <Visualisation key={graph._id} graph={graph} />
              </div>
            </div>
          </Link>
          <div className="action">
            <div style={{ display: 'flex' }}>
              <span style={{ marginRight: 5 }}>{graph.likes}</span>
              <div className="like">
                <ThumbsUp onClick={() => likeGraph(graph._id)} size="30" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default styled(VisualisationGrid)`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 20px;
width: calc(100% - 80px);
padding: 0px 40px;

.like {
  background: var(--color-button);
  border-radius: 50%;
  padding: 2px;
  border: 1px solid var(--color-heading);
  :hover {
    background: var(--color-button-hover);
  }
}

${below.med`
  grid-template-columns: 1fr
  padding: 0px;
  width: 100%;
`}

.graphTitle {
  padding: 10px 20px;
  border-bottom: 1px solid var(--color-border);

  h3 {
    margin: 0px;
  }
}

.vizWrapper {
    position: relative;
    height: 450px;
    width: calc(100% - 2px);
    margin: 0px auto;
}

.action {
    border-top: 1px solid var(--color-border);
    padding: 10px 10px;

    svg:hover {
      color: var(--color-button);
    }
  }

`
