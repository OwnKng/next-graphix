import Scatter from './scatter'
import Bar from './Bar'
import Line from './Line'
import { Light, Dark } from '../styled/utilities'

const Visualisation = ({ graph }) => {
  const { geometry } = graph

  const theme = graph.theme === 'dark' ? Dark : Light

  if (geometry == 'point') {
    return (
      <Scatter {...graph} theme={theme} />
    )
  }

  if (geometry == 'bar') {
    return (
      <Bar {...graph} theme={theme} />
    )
  }

  return (
    <Line {...graph} theme={theme} />
  )
}

export default Visualisation
