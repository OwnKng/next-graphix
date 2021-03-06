import styled from 'styled-components'
import Visualisation from './visualisation'
import Controls from './controls'

type GraphixBuilderProps = {
    className: string
}

const GraphixBuilder = ({ className }: GraphixBuilderProps) => (
  <div className={className}>
    <div style={{ gridArea: 'viz' }}>
      <Visualisation />
    </div>
    <div style={{ gridArea: 'controls' }}>
      <Controls />
    </div>
  </div>
)

export default styled(GraphixBuilder)`
    width: 98vw;
    height: 80vh;
    display: grid;
    margin: 0px auto;
    grid-template-areas: "viz controls";
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 10px;
`
