import { user } from '../../db/controllers'

const UserId = () => (
  <h1>Hello World!</h1>
)

export async function getServerSideProps(context: object) {
  // const userId = await user.getUser(context.params.id)

  /*

  const charts = results.map((doc) => {
    const chart = doc.toObject()
    return { ...chart, data: JSON.parse(chart.data) }
  })

  let liked = await graphics.likedCharts(session.user.id)

  liked = liked.map((doc) => {
    const likedGraph = doc.toObject()
    return { ...likedGraph, data: JSON.parse(likedGraph.data) }
  })

  */

  return {
    props: {},
  }
}

export default UserId
