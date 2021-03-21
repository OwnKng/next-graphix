import styled from 'styled-components'
import { connectToDB } from '../../../db/connectToDB'
import { graphics } from '../../../db/controllers'
import Line from '../../../components/visualisations/Line'
import Bar from '../../../components/visualisations/Bar'
import Scatter from '../../../components/visualisations/scatter'
import { elevation, Light, Dark } from '../../../components/styled/utilities'

const Discover = ({ graph, className }) => {
  const viz = graph[0]

  const theme = viz.theme === 'dark' ? Dark : Light

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
        <h1>{viz.title}</h1>
        <h2>{viz.subtitle}</h2>
        <div className="viz">
          {viz.geometry === 'bar' && (
          <Bar {...viz} theme={theme} />
          )}
          {viz.geometry === 'line' && (
          <Line {...viz} theme={theme} />
          )}
          {viz.geometry === 'point' && (
          <Scatter {...viz} theme={theme} />
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const props: any = {}
  await connectToDB()

  let graph = await graphics.getChart(context.query.id)
  graph = [graph]

  graph = graph.map((doc) => {
    const graph = doc.toObject()
    return graph
  }).map((graph) => ({ ...graph, data: JSON.parse(graph.data) }))

  props.graph = graph

  return {
    props,
  }
}

export default styled(Discover)`
min-height: 90vh;  
display: flex;
place-items: center;

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
  height: 80vh;
  margin: 0px auto;
  background: var(--color-foreground);
  padding: 10px;
}

  .viz {
    position: relative;
    height: 70vh;
    width: 100%;
  }
`
