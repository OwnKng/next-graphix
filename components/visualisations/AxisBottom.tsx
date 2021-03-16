import { AnimatedAxis } from '@visx/react-spring'
import { AxisBottom as AxisBottomVisx } from '@visx/axis'
import { format } from 'd3'

const AxisBottom = ({
  top, animated = true, scale, x, color, styles,
}) => {
  if (animated) {
    return (
      <AnimatedAxis
        top={top}
        orientation="bottom"
        scale={scale}
        stroke={color}
        tickStroke={color}
        tickFormat={format('d')}
        label={x}
        tickLabelProps={() => ({
          fill: color,
          fontSize: 12,
          textAnchor: styles.textDirection === 'horizontal' ? 'middle' : 'start',
          transform: styles.textDirection === 'horizontal' ? 'none' : 'rotate(90)',
        })}
      />
    )
  }
  return (
    <AnimatedAxis
      top={top}
      orientation="bottom"
      scale={scale}
      label={x}
      numTicks={scale.domain().length}
      stroke={color}
      tickStroke={color}
      tickLabelProps={() => ({
        fill: color,
        fontSize: 12,
        textAnchor: styles.textDirection === 'horizontal' ? 'middle' : 'start',
        transform: styles.textDirection === 'horizontal' ? 'none' : 'rotate(90)',
      })}
    />
  )
}

export default AxisBottom
