import styled from 'styled-components'
import Scatter from '../visualisations/scatter'

type VisualisationProps = {
    className: string
}

const dummyData = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }]

const Visualisation = ({ className }: VisualisationProps) => (
  <div className={className}>
    <h2>Title</h2>
    <h3>Subtitle</h3>
    <Scatter data={dummyData} x="x" y="y" width={500} height={500} />
  </div>
)

export default styled(Visualisation)`
border: 1px solid black;
width: 100%;
`
