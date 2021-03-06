import { getSession } from 'next-auth/client'
import { useState } from 'react'
import { connectToDB } from '../../../api/connectToDB'
import { graphics } from '../../../api/controllers'
import GraphList from '../../components/graphList'
import GraphixBuilder from '../../components/builder/graphicsBuilder'

type AppProps = {
  charts: any[]
}

const App = ({ charts }: AppProps) => {
  const [builder, setBuilder] = useState(false)

  if (builder) {
    return (
      <GraphixBuilder />
    )
  }

  return (
    <>
      <h1>Hello there</h1>
      <GraphList graphs={charts} />
      <button onClick={() => setBuilder(true)}>Create new chart</button>
    </>
  )
}

export async function getServerSideProps(context: object) {
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

  const props: any = { session }
  await connectToDB()
  const results = await graphics.getCharts(session.user.id)
  const charts = results.map((doc) => {
    const chart = doc.toObject()
    return chart
  })

  props.charts = charts

  return {
    props,
  }
}

export default App
