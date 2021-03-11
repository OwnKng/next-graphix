import styled from 'styled-components'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Visualisation from '../../components/visualisations/Visualisation'
import { elevation } from '../../components/styled/utilities'
import { Card } from '../../components/styled/elements/Card'

type DiscoverProps = {
  className: string,
}

const Discover = ({ className }: DiscoverProps) => {
  const [data, setData] = useState({ graphs: null, loading: true, error: false })
  const [geo, setGeo] = useState('all')

  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const likeChart = async (_id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/likes/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) refreshData()
  }

  const getCharts = async (geometry: string) => {
    let url
    if (geometry === 'all') {
      url = `${process.env.NEXT_PUBLIC_API_HOST}/api/discover/`
    } else {
      url = `${process.env.NEXT_PUBLIC_API_HOST}/api/discover/${geometry}`
    }

    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => response.data.map((d) => {
        const graph = { ...d, data: JSON.parse(d.data) }
        return graph
      }))
      .then((graphs) => setData({ graphs, error: false, loading: false }))
      .catch(() => setData({ graphs: null, loading: false, error: true }))
  }

  useEffect(() => {
    getCharts(geo)
  }, [geo])

  const { graphs, error } = data

  return (
    <div className={className}>
      <h1>Graph</h1>
      <label htmlFor="select-geometry">Select geometry</label>
      <select value={geo} onChange={(e) => setGeo(e.target.value)} id="select-geometry">
        <option value="all">All</option>
        <option value="point">Point</option>
        <option value="line">Line</option>
        <option value="bar">Bar</option>
      </select>
      {graphs && (
      <div className="grid">
        {graphs.map((graph) => (
          <Card className="card">
            <Link href={`/discover/${graph._id}`}>
              <div>
                <h3>{graph.title}</h3>
                <div className="vizWrapper">
                  <Visualisation key={graph._id} graph={graph} />
                </div>
              </div>
            </Link>
            <div>
              {graph.likes}
            </div>
            <button onClick={() => likeChart(graph._id)}>Like</button>
          </Card>
        ))}
      </div>
      )}
    </div>
  )
}

export default styled(Discover)`
  min-height: 100vh;
  width: 95vw;
  margin: 0px auto;

  .card {
    display: flex;
    flex-direction: column;
    ${elevation[1]};
    background: var(--color-foreground);
    padding: 10px;
  }

  .vizWrapper {
    position: relative;
    height: 500px;
  }

  a {
    display: block;
    font-size: 1.4rem;
    text-decoration: none;
    color: var(--color-paragraph);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }
`
