import { useRouter } from 'next/router'

type GraphListProps = {
    graphs: any[]
}

const GraphList = ({ graphs }: GraphListProps) => {
  const router = useRouter()

  const likeChart = async (_id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/likes/${_id}`, {
      method: 'PUT',
      body: '',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const deleteChart = async (_id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/graphics/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // const { data } = await res.json()
  }

  return (
    <>
      {graphs.map((graph) => (
        <div key={graph._id}>
          <h3 onClick={() => router.push(`/create/${graph._id}`)}>{graph.title}</h3>
          <span>{graph.likes}</span>
          <button onClick={() => likeChart(graph._id)}>Like chart</button>
          <button onClick={() => deleteChart(graph._id)}>Delete</button>
        </div>
      ))}
    </>
  )
}

export default GraphList
