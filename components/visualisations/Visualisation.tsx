import Scatter from './scatter'
import Bar from './Bar'
import Line from './Line'

const Visualisation = ({ graph }) => {
  const { geometry } = graph

  if (geometry == 'point') {
    return (
      <Scatter {...graph} />
    )
  }

  if (geometry == 'bar') {
    return (
      <Bar {...graph} />
    )
  }

  return <Line {...graph} />
}

export default Visualisation
