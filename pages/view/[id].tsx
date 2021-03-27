import styled from 'styled-components'
import Link from 'next/link'
import { ThumbsUp } from '@styled-icons/feather/ThumbsUp'
import { useRouter } from 'next/router'
import { connectToDB } from '../../db/connectToDB'
import { graphics, user as userController } from '../../db/controllers'
import Line from '../../components/visualisations/Line'
import Bar from '../../components/visualisations/Bar'
import Scatter from '../../components/visualisations/scatter'
import { elevation, Light, Dark } from '../../components/styled/utilities'

type ViewProps = {
  graph: any,
  user: any,
  className: string
}

const View = ({ graph, user, className }: ViewProps) => {
  const theme = graph.theme === 'dark' ? Dark : Light

  const router = useRouter()

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
    <div
      className={className}
    >
      <div
        className="vizWrapper"
        style={{
          color: theme.text,
          background: theme.background,
        }}
      >
        <h1>{graph.title}</h1>
        <h2>{graph.subtitle}</h2>
        <div className="viz">
          {graph.geometry === 'bar' && (
          <Bar {...graph} theme={theme} />
          )}
          {graph.geometry === 'line' && (
          <Line {...graph} theme={theme} />
          )}
          {graph.geometry === 'point' && (
          <Scatter {...graph} theme={theme} />
          )}
        </div>
      </div>
      <div className="attribution">
        {user ? (
          <>
            <p>Created by </p>
            <Link href={`/user/${graph.createdBy}`}>
              <div className="link">
                <img src={user.image} />
                <p>{user.name}</p>
              </div>
            </Link>
          </>
        ) : <p>Created by an unknown user</p>}
      </div>
      <div className="action">
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: 5 }}>{graph.likes}</span>
          <div className="like">
            <ThumbsUp onClick={() => likeGraph(graph._id)} size="30" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  await connectToDB()

  let graph = await graphics.getChart(context.query.id)
  graph = [graph]

  graph = graph.map((doc) => {
    const graph = doc.toObject()
    return graph
  }).map((graph) => ({ ...graph, data: JSON.parse(graph.data) }))

  const user = await userController.getUser(graph[0].createdBy)

  if (!user) {
    return {
      props: { graph: graph[0] },
    }
  }

  return {
    props: { graph: graph[0], user: { name: user.name, image: user.image } },
  }
}

export default styled(View)`
min-height: 90vh;  
padding: 10px;

h1 {
  margin: 0px;
  font-size: 1.6em;
}

h2 {
  margin: 0px;
  font-size: 1.3em;
}

.vizWrapper {
  ${elevation[1]}; 
  width: 90vw;
  margin: 0px auto;
  background: var(--color-foreground);
  padding: 10px;
}

.viz {
  position: relative;
  height: 70vh;
  width: 100%;
}

.attribution {
  padding: 5px;
  display: flex;
  place-items: center;
  width: 90vw;
  margin: 0px auto;

  .link {
    display: flex;
    padding: 0px 10px;
    color: var(--color-button);
    font-weight: bold;
    cursor: pointer;
    
    :hover {
      color: var(--color-button-hover);
    }
  }
}

.action {
  padding: 5px;
  display: flex;
  place-items: center;
  width: 90vw;
  margin: 0px auto;

  .like {
    background: var(--color-button);
    border-radius: 50%;
    padding: 2px;
    border: 1px solid var(--color-heading);
    :hover {
      background: var(--color-button-hover);
    }
  }
}



img {
  margin: 0px auto;
  border: 1px solid var(--color-button);
  display: flex;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
}
`
