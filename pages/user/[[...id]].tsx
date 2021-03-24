import { getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { graphics, user as userController } from '../../db/controllers'
import GraphList from '../../components/graphList'
import LikedCharts from '../../components/likedCharts'
import { connectToDB } from '../../db/connectToDB'
import VisualisationGrid from '../../components/visualisations/VisualisationGrid'

type AppProps = {
  className: string
  graphs: any[]
  user: object
  liked: any[]
  param: boolean
}

const App = ({
  className, graphs, user, liked, param,
}: AppProps) => {
  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const likeChart = async (_id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST || ''}/api/likes/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) refreshData()
  }

  const deleteChart = async (_id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST || ''}/api/graphics/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) refreshData()
  }

  if (param) {
    return (
      <div className={className}>
        <div className="hero">
          <img src={user.image} />
          <h1>
            {user.name}
            's graphix
          </h1>
        </div>
        <VisualisationGrid graphs={graphs} />
        <VisualisationGrid graphs={liked} />
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="hero">
        <img src={user.image} />
        <h1>
          {user.name}
          's graphix
        </h1>
      </div>
      <GraphList graphs={graphs} deleteChart={deleteChart} likeChart={likeChart} />
      <LikedCharts liked={liked} like={likeChart} />
    </div>
  )
}

export async function getServerSideProps(context: object) {
  const getGraphixs = async (id: string) => {
    await connectToDB()

    const results = await graphics.getUserCharts(id)

    const graphs = results.map((doc) => {
      const chart = doc.toObject()
      return { ...chart, data: JSON.parse(chart.data) }
    })

    let liked = await graphics.likedCharts(id)

    liked = liked.map((doc) => {
      const likedGraph = doc.toObject()
      return { ...likedGraph, data: JSON.parse(likedGraph.data) }
    })

    return { graphs, liked }
  }

  if (context.params.id) {
    const graphix = await getGraphixs(context.params.id[0])
    const user = await userController.getUser(context.params.id[0])

    return {
      props: { ...graphix, user: { name: user.name, image: user.image }, param: true },
    }
  }

  const session = await getSession(context)

  // not signed in
  if (!session || !session.user) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }

  const graphix = await getGraphixs(session.user.id)
  const { user } = session

  return {
    props: { ...graphix, user },
  }
}

export default styled(App)`
  width: 100%;

  .hero {
    display: flex;
    flex-direction: column;
    padding: 100px 0px 20px;
    justify-items: flex-end;
    background: var(--color-button);
    
  img {
    margin: 0px auto;
    display: flex;
    width: 100px;
    border-radius: 50%;
  }

  h1 {
    margin: 0px;
    text-transform: uppercase;
    text-align: center;
  }
  }
`