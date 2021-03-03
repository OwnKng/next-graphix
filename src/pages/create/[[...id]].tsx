import { getSession } from 'next-auth/client'
import { connectToDB } from '../../../api/connectToDB'
import { selections } from '../../../api/responses'
import GraphList from '../../components/graphList'

type AppProps = {
  charts: any[]
}

const App = ({ charts }: AppProps) => (
  <>
    <h1>Hello there</h1>
    <GraphList graphs={charts} />
  </>
)

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
  const { db } = await connectToDB()
  const charts = await selections.getCharts(db, session.user.id)
  props.charts = charts

  return {
    props,
  }
}

export default App
