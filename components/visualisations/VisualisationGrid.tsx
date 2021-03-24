import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { ThumbsUp } from '@styled-icons/feather/ThumbsUp'
import styled from 'styled-components'
import Visualisation from './Visualisation'
import { Card } from '../styled/elements/Card'

const VisualisationGrid = ({ graphs, className }) => {
  const router = useRouter()
  const [session] = useSession()

  const likeChart = async (_id: string) => {
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
  )
}

export default styled(VisualisationGrid)`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap: 20px;
width: calc(100%) - 80px;
padding: 20px 40px;


@media only screen and (max-width: 600px) {
    grid-template-columns: 1fr
}

h3 {
    margin: 0px 0px;
    padding: 0px 5px;
    width: calc(100% - 10px);
    border-bottom: 1px solid var(--color-border);
  }

.vizWrapper {
    position: relative;
    height: 450px;
    width: calc(100% - 2px);
    margin: 0px auto;
}

.action {
    border-top: 1px solid var(--color-border);
    padding: 5px;

    svg:hover {
      color: var(--color-button);
    }
  }

`
