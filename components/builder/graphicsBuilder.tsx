import styled from 'styled-components'
import Visualisation from './visualisation'
import Controls from './controls'
import { below } from '../styled/utilities'

type GraphixBuilderProps = {
  className: string,
  data: any[]
}

const GraphixBuilder = ({ className, data }: GraphixBuilderProps) => (
  <div className={className}>
    <div style={{ gridArea: 'viz' }}>
      <Visualisation />
    </div>
    <div style={{ gridArea: 'controls' }}>
      <Controls data={data} />
    </div>
  </div>
)

export default styled(GraphixBuilder)`
    width: 95vw;
    padding: 10px 0px;
    height: 85vh;
    background: var(--color-background);
    display: grid;
    margin: 0px auto;
    grid-template-areas: "viz controls";
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 25px;

    ${below.med`
      height: auto;
      grid-template-areas: "viz" "controls";
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto;
      overflow: hidden;
    `}
`
