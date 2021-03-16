import { AnimatedAxis } from '@visx/react-spring'
import { AxisLeft as AxisLeftVisx } from '@visx/axis'
import { format } from 'd3'

const AxisLeft = ({
  animated = true, scale, y, color,
}) => {
  if (animated) {
    return (
      <AnimatedAxis
        orientation="left"
        scale={scale}
        hideAxisLine
        hideTicks
        label={y}
        tickFormat={format('.2s')}
        tickLabelProps={() => ({
          fill: color,
          fontSize: 12,
          textAnchor: 'middle',
        })}
      />
    )
  }
  return (
    <AxisLeftVisx
      orientation="left"
      scale={scale}
      label={y}
      tickFormat={format('.2s')}
      tickLabelProps={() => ({
        fill: color,
        fontSize: 12,
        textAnchor: 'middle',
      })}
    />
  )
}

export default AxisLeft
