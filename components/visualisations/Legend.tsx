import { LegendOrdinal } from '@visx/legend'

const Legend = ({ scale, left, color }) => (
  <LegendOrdinal
    scale={scale}
    direction="row"
    shape="circle"
    labelMargin="0 30px 0 0"
    style={{
      position: 'absolute',
      top: 10,
      left,
      width: '80%',
      maxHeight: '100%',
      overflow: 'hidden',
      display: 'flex',
      fontSize: '12px',
      flexWrap: 'wrap',
      color,
    }}
  />
)

export default Legend
